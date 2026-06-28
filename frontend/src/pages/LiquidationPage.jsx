import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    MenuItem,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { liquidateReceivable } from "../services/liquidationService";
import { getLiquidationStatement } from "../services/statementService";

function LiquidationPage() {
    const [form, setForm] = useState({
        cedentName: "",
        cedentDocument: "",
        type: "DUPLICATA",
        receivableCurrency: "BRL",
        paymentCurrency: "BRL",
        faceValue: "",
        dueDate: "",
    });

    const [liquidationResult, setLiquidationResult] = useState(null);
    const [liquidationError, setLiquidationError] = useState([]);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        cedentName: "",
        cedentDocument: "",
        currency: "",
    });

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [statementError, setStatementError] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortDir, setSortDir] = useState("asc");

    function handleSort(field) {
        if (sortField === field) {
            if (sortDir === "asc") {
                setSortDir("desc");
            } else {
                setSortField(null);
                setSortDir("asc");
            }
        } else {
            setSortField(field);
            setSortDir("asc");
        }
    }

    function getSortedRows() {
        if (!sortField) return rows;
        return [...rows].sort((a, b) => {
            let va = a[sortField] ?? "";
            let vb = b[sortField] ?? "";
            if (typeof va === "number" && typeof vb === "number") {
                return sortDir === "asc" ? va - vb : vb - va;
            }
            return sortDir === "asc"
                ? String(va).localeCompare(String(vb))
                : String(vb).localeCompare(String(va));
        });
    }

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
        setLiquidationError([]);
        setLiquidationResult(null);

        const errors = [];
        if (!form.cedentName || !form.cedentName.trim())
            errors.push("Preencha o campo Nome do Cedente.");
        if (!form.cedentDocument || !form.cedentDocument.trim())
            errors.push("Preencha o campo Documento do Cedente.");
        if (!form.faceValue || Number(form.faceValue) <= 0)
            errors.push("Preencha o campo Valor de Face com um valor maior que zero.");
        if (!form.dueDate) {
            errors.push("Preencha a Data de Vencimento.");
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const due = new Date(form.dueDate + "T00:00:00");
            if (isNaN(due.getTime()) || due <= today)
                errors.push("Data de Vencimento inválida. Informe uma data futura.");
        }
        if (form.receivableCurrency === "BRL" && form.paymentCurrency === "USD")
            errors.push("Conversão BRL → USD não está disponível. Utilize USD → BRL para recebíveis em dólar.");

        if (errors.length > 0) {
            setLiquidationError(errors);
            return;
        }

        try {
            const data = await liquidateReceivable({
                ...form,
                faceValue: Number(form.faceValue),
            });
            setLiquidationResult(data);
            setPage(0);
            await loadStatement(0);
        } catch (err) {
            setLiquidationError([
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Erro ao liquidar recebível."
            ]);
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
            {/* Cabeçalho */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 36, height: 36, bgcolor: "primary.main", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CurrencyExchangeIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
                        Liquidação de Recebíveis
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Registre liquidações com conversão cambial automática entre BRL e USD
                    </Typography>
                </Box>
            </Box>

            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: "0.5px solid", borderColor: "divider" }}>
                <Box component="form" onSubmit={handleLiquidate}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Nome do Cedente" name="cedentName" value={form.cedentName} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Documento do Cedente" name="cedentDocument" value={form.cedentDocument} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Tipo" name="type" value={form.type} onChange={handleFormChange}>
                                <MenuItem value="DUPLICATA">Duplicata</MenuItem>
                                <MenuItem value="CHEQUE">Cheque</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Moeda Recebível" name="receivableCurrency" value={form.receivableCurrency} onChange={handleFormChange}>
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Moeda Pagamento" name="paymentCurrency" value={form.paymentCurrency} onChange={handleFormChange}>
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="number" label="Valor de Face" name="faceValue" value={form.faceValue} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="date" label="Data de Vencimento" name="dueDate" value={form.dueDate} onChange={handleFormChange} slotProps={{ inputLabel: { shrink: true } }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" size="large" sx={{ minWidth: 140, px: 3 }}>
                                Liquidar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {liquidationError.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {liquidationError.length === 1 ? (
                        liquidationError[0]
                    ) : (
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {liquidationError.map((msg, i) => (
                                <li key={i}>{msg}</li>
                            ))}
                        </ul>
                    )}
                </Alert>
            )}

            {liquidationResult && (
                <Paper
                    elevation={0}
                    sx={{
                        p: "1.25rem 1.5rem",
                        mb: 4,
                        borderRadius: 3,
                        border: "0.5px solid",
                        borderColor: "divider",
                        borderLeft: "4px solid",
                        borderLeftColor: "success.main",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, pb: 1.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                        <CheckCircleIcon sx={{ color: "success.main", fontSize: 22 }} />
                        <Typography variant="body1" fontWeight={700} color="success.main">
                            Liquidação Confirmada
                        </Typography>
                        <Chip
                            label={liquidationResult.type}
                            size="small"
                            sx={{ bgcolor: "rgba(24,95,165,0.1)", color: "#185FA5", fontWeight: 500, fontSize: "0.75rem" }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {[
                            ["Cedente", liquidationResult.cedentName],
                            ["Moeda Recebível", liquidationResult.receivableCurrency],
                            ["Moeda Pagamento", liquidationResult.paymentCurrency],
                            ["Cotação Aplicada", formatNumber(liquidationResult.exchangeRate)],
                            ["Valor de Face", formatNumber(liquidationResult.faceValue)],
                            ["Valor Presente", formatNumber(liquidationResult.presentValue)],
                            ["Liquidado em", new Date(liquidationResult.settledAt).toLocaleDateString("pt-BR")],
                            ["Documento", liquidationResult.cedentDocument],
                        ].map(([label, value]) => (
                            <Box key={label} sx={{ minWidth: 130 }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.25 }}>{label}</Typography>
                                <Typography variant="body1" fontWeight={500}>{value}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            )}

            <Divider sx={{ mb: 4 }} />

            {/* Extrato */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 36, height: 36, bgcolor: "primary.main", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ReceiptLongIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
                        Extrato de Liquidações
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Consulte o histórico completo de liquidações com filtros
                    </Typography>
                </Box>
            </Box>

            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "0.5px solid", borderColor: "divider" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    <TextField
                        label="Nome do Cedente"
                        name="cedentName"
                        value={filters.cedentName}
                        onChange={handleFilterChange}
                        sx={{ minWidth: 200 }}
                    />
                    <TextField
                        label="Documento do Cedente"
                        name="cedentDocument"
                        value={filters.cedentDocument}
                        onChange={handleFilterChange}
                        sx={{ minWidth: 200 }}
                    />
                    <TextField
                        label="Data Início"
                        name="startDate"
                        type="date"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ minWidth: 170 }}
                    />
                    <TextField
                        label="Data Fim"
                        name="endDate"
                        type="date"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ minWidth: 170 }}
                    />
                    <TextField
                        select
                        label="Moeda"
                        name="currency"
                        value={filters.currency}
                        onChange={handleFilterChange}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">Todas</MenuItem>
                        <MenuItem value="BRL">BRL</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                    </TextField>
                </Stack>
                <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ minWidth: 140, px: 3 }}>
                    Pesquisar
                </Button>
            </Paper>

            {statementError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {statementError}
                </Alert>
            )}

            <Typography variant="body2" sx={{ mb: 2 }}>
                {totalElements} liquidações encontradas
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, overflowX: "auto", border: "0.5px solid", borderColor: "divider" }}>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "rgba(27,35,86,0.05)" }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.secondary" }}>#</TableCell>
                            {[
                                { label: "Data", field: "settledAt" },
                                { label: "Cedente", field: "cedentName" },
                                { label: "Documento", field: "cedentDocument" },
                                { label: "Tipo", field: "type" },
                                { label: "Valor Face", field: "faceValue" },
                                { label: "Valor Presente", field: "presentValue" },
                                { label: "Moeda Recebível", field: "receivableCurrency" },
                                { label: "Moeda Pagamento", field: "paymentCurrency" },
                                { label: "Cotação", field: "exchangeRate" },
                            ].map(({ label, field }) => (
                                <TableCell key={field} sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.secondary", cursor: "pointer", userSelect: "none" }}>
                                    <TableSortLabel
                                        active={sortField === field}
                                        direction={sortField === field ? sortDir : "asc"}
                                        onClick={() => handleSort(field)}
                                    >
                                        {label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getSortedRows().map((row, index) => (
                            <TableRow
                                key={row.settlementId}
                                sx={{ bgcolor: index % 2 === 1 ? "rgba(0,0,0,0.02)" : "transparent" }}
                            >
                                <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>#{row.settlementId}</TableCell>
                                <TableCell>{row.settledAt ? new Date(row.settledAt).toLocaleDateString("pt-BR") : "-"}</TableCell>
                                <TableCell>{row.cedentName}</TableCell>
                                <TableCell>{row.cedentDocument}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.type}
                                        size="small"
                                        sx={{ bgcolor: "rgba(24,95,165,0.1)", color: "#185FA5", fontWeight: 500, fontSize: "0.72rem" }}
                                    />
                                </TableCell>
                                <TableCell>{formatNumber(row.faceValue)}</TableCell>
                                <TableCell>{formatNumber(row.presentValue)}</TableCell>
                                <TableCell>{row.receivableCurrency}</TableCell>
                                <TableCell>{row.paymentCurrency}</TableCell>
                                <TableCell>{formatNumber(row.exchangeRate)}</TableCell>
                            </TableRow>
                        ))}
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell align="center" colSpan={11}>
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
