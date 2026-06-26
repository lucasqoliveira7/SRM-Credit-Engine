import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
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
    Typography
} from "@mui/material";

import { getLiquidationStatement } from "../services/statementService";

function StatementPage() {
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        cedentDocument: "",
        currency: "",
    });

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function formatNumber(value) {
        if (value === null || value === undefined || value === "") {
            return "-";
        }

        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(value));
    }

    async function loadStatement(selectedPage = page) {
        setError("");

        try {
            const params = Object.fromEntries(
                Object.entries(filters).filter(([, value]) => value !== "")
            );

            const data = await getLiquidationStatement(
                params,
                selectedPage,
                pageSize
            );

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
            console.error("Erro completo:", err);
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
            console.error("URL:", err.config?.url);

            setRows([]);
            setTotalElements(0);
            setTotalPages(0);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Erro ao carregar extrato de liquidações."
            );
        }
    }

    function handleSearch() {
        setPage(0);
        loadStatement(0);
    }

    function handlePageChange(event, value) {
        setPage(value - 1);
    }

    function DateField({ label, name, value }) {
        return (
            <TextField
                fullWidth
                type="date"
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            />
        );
    }

    useEffect(() => {
        loadStatement(page);
    }, [page]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Extrato de Liquidações
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <DateField
                            label="Início"
                            name="startDate"
                            value={filters.startDate}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <DateField
                            label="Fim"
                            name="endDate"
                            value={filters.endDate}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Documento Cedente"
                            name="cedentDocument"
                            value={filters.cedentDocument}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <TextField
                            select
                            fullWidth
                            label="Moeda"
                            name="currency"
                            value={filters.currency}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="BRL">BRL</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSearch}
                            sx={{
                                height: "56px",
                                backgroundColor: "#ff7a00",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#e86f00",
                                },
                            }}
                        >
                            Pesquisar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Typography variant="body2" sx={{ mb: 2 }}>
                {totalElements} liquidações encontradas
            </Typography>

            <TableContainer
                component={Paper}
                elevation={3}
                sx={{ borderRadius: 3, overflowX: "auto" }}
            >
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
                                    {row.settledAt
                                        ? new Date(row.settledAt).toLocaleDateString("pt-BR")
                                        : "-"}
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

export default StatementPage;