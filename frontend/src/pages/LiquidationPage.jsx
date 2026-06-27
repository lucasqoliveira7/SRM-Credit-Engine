import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import { liquidateReceivable } from "../services/liquidationService";
import { getLiquidationStatement } from "../services/statementService";

function LiquidationPage() {
    const [form, setForm] = useState({
        cedentName: "",
        cedentDocument: "",
        type: "DUPLICATA",
        receivableCurrency: "BRL",
        paymentCurrency: "BRL",
        faceValue: "10000",
        dueDate: "2026-08-30",
    });

    const [liquidationResult, setLiquidationResult] = useState(null);
    const [liquidationError, setLiquidationError] = useState("");

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        cedentDocument: "",
        currency: "",
    });

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [statementError, setStatementError] = useState("");

    function handleFormChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function handleFilterChange(event) {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    }

    function formatNumber(value) {
        if (value === null || value === undefined || value === "") return "-";
        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(value));
    }

    async function handleLiquidate(event) {
        event.preventDefault();
        setLiquidationError("");
        setLiquidationResult(null);

        try {
            const data = await liquidateReceivable({
                ...form,
                faceValue: Number(form.faceValue),
            });
            setLiquidationResult(data);
            loadStatement(0);
        } catch (err) {
            setLiquidationError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Erro ao liquidar recebível."
            );
        }
    }

    async function loadStatement(selectedPage = page) {
        setStatementError("");
        try {
            const params = Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v !== "")
            );
            const data = await getLiquidationStatement(params, selectedPage, 10);

            if (Array.isArray(data)) {
                setRows(data);
                setTotalElements(data.length);
                setTotalPages(1);
                return;
            }

            setRows(data.content || []);
            setTotalElements(data.totalElements || 0);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            setRows([]);
            setTotalElements(0);
            setTotalPages(0);
            setStatementError(
                err.response?.data?.message || "Erro ao carregar extrato."
            );
        }
    }

    function handleSearch() {
        setPage(0);
        loadStatement(0);
    }

    function handlePageChange(_, value) {
        setPage(value - 1);
    }

    useEffect(() => {
        loadStatement(page);
    }, [page]);

    return (
        <Box>
            {/* Formulário de Liquidação */}
            <Typography variant="h4" gutterBottom>
                Liquidação de Recebíveis
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                <Box component="form" onSubmit={handleLiquidate}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome do Cedente"
                                name="cedentName"
                                value={form.cedentName}
                                onChange={handleFormChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Documento do Cedente"
                                name="cedentDocument"
                                value={form.cedentDocument}
                                onChange={handleFormChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select fullWidth
                                label="Tipo"
                                name="type"
                                value={form.type}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="DUPLICATA">Duplicata</MenuItem>
                                <MenuItem value="CHEQUE">Cheque</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select fullWidth
                                label="Moeda Recebível"
                                name="receivableCurrency"
                                value={form.receivableCurrency}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select fullWidth
                                label="Moeda Pagamento"
                                name="paymentCurrency"
                                value={form.paymentCurrency}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth type="number"
                                label="Valor de Face"
                                name="faceValue"
                                value={form.faceValue}
                                onChange={handleFormChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth type="date"
                                label="Data de Vencimento"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleFormChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                            >
                                Liquidar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {liquidationError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {liquidationError}
                </Alert>
            )}

            {liquidationResult && (
                <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom color="success.main">
                        Liquidação Confirmada
                    </Typography>
                    <Grid container spacing={1}>
                        {[
                            ["ID", liquidationResult.settlementId],
                            ["Cedente", liquidationResult.cedentName],
                            ["Tipo", liquidationResult.type],
                            ["Valor de Face", formatNumber(liquidationResult.faceValue)],
                            ["Valor Presente", formatNumber(liquidationResult.presentValue)],
                            ["Moeda Recebível", liquidationResult.receivableCurrency],
                            ["Moeda Pagamento", liquidationResult.paymentCurrency],
                            ["Cotação Aplicada", formatNumber(liquidationResult.exchangeRate)],
                            ["Status", liquidationResult.status],
                            ["Liquidado em", new Date(liquidationResult.settledAt).toLocaleDateString("pt-BR")],
                        ].map(([label, value]) => (
                            <Grid item xs={12} sm={6} md={4} key={label}>
                                <Typography variant="body2" color="text.secondary">{label}</Typography>
                                <Typography variant="body1" fontWeight="bold">{value}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}

            <Divider sx={{ mb: 4 }} />

            {/* Extrato */}
            <Typography variant="h4" gutterBottom>
                Extrato de Liquidações
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth type="date"
                            label="Data Início"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth type="date"
                            label="Data Fim"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Documento Cedente"
                            name="cedentDocument"
                            value={filters.cedentDocument}
                            onChange={handleFilterChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            select fullWidth
                            label="Moeda"
                            name="currency"
                            value={filters.currency}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="BRL">BRL</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSearch}
                            sx={{ minWidth: 140, px: 3 }}
                        >
                            Pesquisar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {statementError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {statementError}
                </Alert>
            )}

            <Typography variant="body2" sx={{ mb: 2 }}>
                {totalElements} liquidações encontradas
            </Typography>

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflowX: "auto" }}>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Cedente</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Valor Face</TableCell>
                            <TableCell>Valor Presente</TableCell>
                            <TableCell>Moeda</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.settlementId}>
                                <TableCell>{row.settlementId}</TableCell>
                                <TableCell>
                                    {row.settledAt ? new Date(row.settledAt).toLocaleDateString("pt-BR") : "-"}
                                </TableCell>
                                <TableCell>{row.cedentName}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{formatNumber(row.faceValue)}</TableCell>
                                <TableCell>{formatNumber(row.presentValue)}</TableCell>
                                <TableCell>{row.paymentCurrency}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell align="center" colSpan={8}>
                                    Nenhuma liquidação encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
}

export default LiquidationPage;
