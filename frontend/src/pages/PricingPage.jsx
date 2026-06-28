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

function formatNumber(value) {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
}

function formatDate(value) {
    if (!value) return "-";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}

function PricingPage() {
    const [form, setForm] = useState({
        type: "DUPLICATA",
        currency: "BRL",
        faceValue: "",
        dueDate: "",
    });

    const [results, setResults] = useState([]);
    const [error, setError] = useState([]);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError([]);

        const errors = [];
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

        if (errors.length > 0) {
            setError(errors);
            return;
        }

        try {
            const data = await simulatePricing({
                ...form,
                faceValue: Number(form.faceValue),
            });
            setResults(prev => [data, ...prev]);
        } catch (err) {
            setError([
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Erro ao simular precificação. Verifique se o backend está rodando."
            ]);
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
                                select fullWidth
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
                                select fullWidth
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
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" size="large">
                                Simular
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {error.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error.length === 1 ? (
                        error[0]
                    ) : (
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {error.map((msg, i) => (
                                <li key={i}>{msg}</li>
                            ))}
                        </ul>
                    )}
                </Alert>
            )}

            {results.length > 0 && (
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Resultados ({results.length})
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => setResults([])}
                        >
                            Limpar Lista
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {results.map((result, index) => (
                            <Paper
                                key={index}
                                elevation={3}
                                sx={{ p: 3, borderRadius: 3, borderLeft: "4px solid", borderColor: "secondary.main" }}
                            >
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                    {[
                                        ["Tipo", result.type],
                                        ["Moeda", result.currency],
                                        ["Vencimento", formatDate(result.dueDate)],
                                        ["Valor de Face", formatNumber(result.faceValue)],
                                        ["Valor Presente", formatNumber(result.presentValue)],
                                    ].map(([label, value]) => (
                                        <Box key={label} sx={{ minWidth: 160 }}>
                                            <Typography variant="caption" color="text.secondary" display="block">{label}</Typography>
                                            <Typography variant="body1" fontWeight={600}>{value}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default PricingPage;
