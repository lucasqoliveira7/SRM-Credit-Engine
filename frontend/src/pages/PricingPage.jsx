import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
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
            {/* Hero */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 6 },
                    mb: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #071126 0%, #1B2356 60%, #203A75 100%)",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,138,0,0.07)", pointerEvents: "none" }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <CalculateIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                    <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                        Precificação
                    </Typography>
                </Box>

                <Typography variant="h4" fontWeight={800} sx={{ mb: 1, lineHeight: 1.2 }}>
                    Simulação de <Box component="span" sx={{ color: "secondary.main" }}>Precificação</Box>
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    Calcule o valor presente de recebíveis com precisão decimal.
                </Typography>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mt: 4, mb: 3 }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-end" }}
                >
                    <TextField
                        select
                        label="Tipo do Recebível"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        sx={{ minWidth: 160, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" }, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.25)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" } }, "& .MuiSvgIcon-root": { color: "white" } }}
                    >
                        <MenuItem value="DUPLICATA">Duplicata</MenuItem>
                        <MenuItem value="CHEQUE">Cheque</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Moeda"
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        sx={{ minWidth: 120, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" }, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.25)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" } }, "& .MuiSvgIcon-root": { color: "white" } }}
                    >
                        <MenuItem value="BRL">BRL</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                    </TextField>

                    <TextField
                        label="Valor de Face"
                        name="faceValue"
                        type="number"
                        value={form.faceValue}
                        onChange={handleChange}
                        sx={{ minWidth: 180, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" }, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.25)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" } } }}
                    />

                    <TextField
                        label="Data de Vencimento"
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ minWidth: 190, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" }, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.25)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" } }, "& input[type='date']::-webkit-calendar-picker-indicator": { filter: "invert(1)" } }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ px: 4, fontWeight: 700, color: "primary.dark" }}
                    >
                        Simular
                    </Button>
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
                                elevation={2}
                                sx={{ px: 4, py: 3, borderRadius: 4, borderLeft: "4px solid", borderColor: "secondary.main" }}
                            >
                                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                    {/* Tipo com Chip */}
                                    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 100 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                                            Tipo
                                        </Typography>
                                        <Chip
                                            label={result.type}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.75rem",
                                                alignSelf: "flex-start",
                                                bgcolor: "rgba(27,35,86,0.1)",
                                                color: "primary.main",
                                            }}
                                        />
                                    </Box>

                                    {[
                                        ["Moeda", result.currency],
                                        ["Vencimento", formatDate(result.dueDate)],
                                        ["Valor de Face", formatNumber(result.faceValue)],
                                        ["Valor Presente", formatNumber(result.presentValue)],
                                    ].map(([label, value]) => (
                                        <Box key={label}>
                                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5, fontWeight: 500 }}>
                                                {label}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600} color="text.primary">
                                                {value}
                                            </Typography>
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
