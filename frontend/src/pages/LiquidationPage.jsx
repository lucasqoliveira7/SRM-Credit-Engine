import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import { liquidateReceivable } from "../services/liquidationService";

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

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
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

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setResult(null);

        try {
            const data = await liquidateReceivable({
                ...form,
                faceValue: Number(form.faceValue),
            });

            setResult(data);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Erro ao liquidar recebível. Verifique se o backend está rodando."
            );
        }
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Liquidação de Recebíveis
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome do Cedente"
                                name="cedentName"
                                value={form.cedentName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Documento do Cedente"
                                name="cedentDocument"
                                value={form.cedentDocument}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="DUPLICATA">Duplicata</MenuItem>
                                <MenuItem value="CHEQUE">Cheque</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Moeda Recebível"
                                name="receivableCurrency"
                                value={form.receivableCurrency}
                                onChange={handleChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Moeda Pagamento"
                                name="paymentCurrency"
                                value={form.paymentCurrency}
                                onChange={handleChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Valor de Face"
                                name="faceValue"
                                value={form.faceValue}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Data de Vencimento"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleChange}
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

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {result && (
                <Paper elevation={4} sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Liquidação Confirmada
                    </Typography>

                    <Typography>ID: {result.settlementId}</Typography>
                    <Typography>Cedente: {result.cedentName}</Typography>
                    <Typography>Documento: {result.cedentDocument || form.cedentDocument}</Typography>
                    <Typography>Tipo: {result.type}</Typography>
                    <Typography>Valor de Face: {formatNumber(result.faceValue)}</Typography>
                    <Typography>Valor Presente: {formatNumber(result.presentValue)}</Typography>
                    <Typography>Moeda Recebível: {result.receivableCurrency}</Typography>
                    <Typography>Moeda Pagamento: {result.paymentCurrency}</Typography>
                    <Typography>Cotação Aplicada: {formatNumber(result.exchangeRate)}</Typography>
                    <Typography>Status: {result.status}</Typography>
                    <Typography>
                        Liquidado em: {new Date(result.settledAt).toLocaleDateString("pt-BR")}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default LiquidationPage;