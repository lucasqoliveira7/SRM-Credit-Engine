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
import { simulatePricing } from "../services/pricingService";

function PricingPage() {
    const [form, setForm] = useState({
        type: "DUPLICATA",
        currency: "BRL",
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

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setResult(null);

        try {
            const data = await simulatePricing({
                ...form,
                faceValue: Number(form.faceValue),
            });

            setResult(data);
        } catch (err) {
                      console.error("Erro completo:", err);
                      console.error("Resposta da API:", err.response?.data);

                      setError(
                          err.response?.data?.error ||
                          err.response?.data?.message ||
                          "Erro ao simular precificação. Verifique se o backend está rodando."
                      );
        }
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Simulação de Precificação
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo do Recebível"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="DUPLICATA">Duplicata</MenuItem>
                                <MenuItem value="CHEQUE">Cheque</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Moeda"
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                            >
                                <MenuItem value="BRL">BRL</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Valor de Face"
                                name="faceValue"
                                type="number"
                                value={form.faceValue}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Data de Vencimento"
                                name="dueDate"
                                type="date"
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
                                Simular
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
                        Resultado da Simulação
                    </Typography>

                    <Typography>
                        Tipo: {result.type}
                    </Typography>

                    <Typography>
                        Moeda: {result.currency}
                    </Typography>

                    <Typography>
                        Valor de Face: {result.faceValue}
                    </Typography>

                    <Typography>
                        Valor Presente: {result.presentValue}
                    </Typography>

                    <Typography>
                        Vencimento: {result.dueDate}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default PricingPage;