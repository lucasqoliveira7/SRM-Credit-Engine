import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { saveCurrencyRate, getLatestRate } from "../services/currencyRateService";

function CurrencyRatePage() {
    const [form, setForm] = useState({
        fromCurrency: "USD",
        toCurrency: "BRL",
        rate: "",
        referenceDate: new Date().toISOString().split("T")[0],
    });

    const [queryFrom, setQueryFrom] = useState("USD");
    const [queryTo, setQueryTo] = useState("BRL");

    const [saveResult, setSaveResult] = useState(null);
    const [queryResult, setQueryResult] = useState(null);
    const [saveError, setSaveError] = useState("");
    const [queryError, setQueryError] = useState("");

    function handleFormChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function formatNumber(value) {
        if (value === null || value === undefined) return "-";
        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 6,
        }).format(Number(value));
    }

    async function handleSave(event) {
        event.preventDefault();
        setSaveError("");
        setSaveResult(null);

        try {
            const data = await saveCurrencyRate({
                ...form,
                rate: Number(form.rate),
            });
            setSaveResult(data);
        } catch (err) {
            setSaveError(
                err.response?.data?.message ||
                "Erro ao salvar taxa de câmbio."
            );
        }
    }

    async function handleQuery() {
        setQueryError("");
        setQueryResult(null);

        try {
            const data = await getLatestRate(queryFrom, queryTo);
            setQueryResult(data);
        } catch (err) {
            setQueryError(
                err.response?.data?.message ||
                "Taxa não encontrada para o par de moedas informado."
            );
        }
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Gestão de Câmbio
            </Typography>

            {/* Cadastro de Taxa */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Registrar Nova Taxa
                </Typography>

                <Box component="form" onSubmit={handleSave}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                label="Moeda Origem"
                                name="fromCurrency"
                                value={form.fromCurrency}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                label="Moeda Destino"
                                name="toCurrency"
                                value={form.toCurrency}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Taxa"
                                name="rate"
                                value={form.rate}
                                onChange={handleFormChange}
                                inputProps={{ step: "0.0001" }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Data de Referência"
                                name="referenceDate"
                                value={form.referenceDate}
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
                                Salvar Taxa
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {saveError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {saveError}
                    </Alert>
                )}

                {saveResult && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Taxa registrada: {saveResult.fromCurrency} → {saveResult.toCurrency} = {formatNumber(saveResult.rate)} em {new Date(saveResult.referenceDate).toLocaleDateString("pt-BR")}
                    </Alert>
                )}
            </Paper>

            <Divider sx={{ mb: 4 }} />

            {/* Consulta de Taxa */}
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Consultar Taxa Vigente
                </Typography>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            fullWidth
                            label="Moeda Origem"
                            value={queryFrom}
                            onChange={(e) => setQueryFrom(e.target.value)}
                        >
                            <MenuItem value="BRL">BRL</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            fullWidth
                            label="Moeda Destino"
                            value={queryTo}
                            onChange={(e) => setQueryTo(e.target.value)}
                        >
                            <MenuItem value="BRL">BRL</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={handleQuery}
                            sx={{ height: 56 }}
                        >
                            Consultar
                        </Button>
                    </Grid>
                </Grid>

                {queryError && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        {queryError}
                    </Alert>
                )}

                {queryResult && (
                    <Paper variant="outlined" sx={{ p: 3, mt: 3, borderRadius: 2 }}>
                        <Typography variant="body1">
                            <strong>{queryResult.fromCurrency} → {queryResult.toCurrency}</strong>
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 1, color: "secondary.main", fontWeight: "bold" }}>
                            {formatNumber(queryResult.rate)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Referência: {new Date(queryResult.referenceDate).toLocaleDateString("pt-BR")}
                        </Typography>
                    </Paper>
                )}
            </Paper>
        </Box>
    );
}

export default CurrencyRatePage;
