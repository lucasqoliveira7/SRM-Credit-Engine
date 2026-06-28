import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VerifiedIcon from "@mui/icons-material/Verified";

const stats = [
    { value: "BRL & USD", label: "Moedas Suportadas" },
    { value: "2 Tipos", label: "Duplicata e Cheque" },
    { value: "100%", label: "Rastreável e Auditável" },
    { value: "Real-time", label: "Cálculo de Valor Presente" },
];

const features = [
    {
        icon: <AssessmentIcon sx={{ fontSize: 36, color: "secondary.main" }} />,
        title: "Simulação de Precificação",
        description:
            "Calcule o valor presente de recebíveis com precisão decimal, aplicando taxas específicas por tipo de título.",
        action: "Nova Simulação",
        path: "/pricing",
    },
    {
        icon: <CurrencyExchangeIcon sx={{ fontSize: 36, color: "secondary.main" }} />,
        title: "Liquidação Financeira",
        description:
            "Registre liquidações com conversão cambial automática entre BRL e USD, com cotação atualizada.",
        action: "Liquidar",
        path: "/liquidation",
    },
    {
        icon: <ReceiptLongIcon sx={{ fontSize: 36, color: "secondary.main" }} />,
        title: "Extrato de Operações",
        description:
            "Consulte o histórico completo de liquidações com filtros por cedente, documento, período e moeda.",
        action: "Ver Extrato",
        path: "/liquidation",
    },
];

function Dashboard() {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 7 },
                    mb: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #071126 0%, #1B2356 60%, #203A75 100%)",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Detalhe decorativo */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -60,
                        right: -60,
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: "rgba(255,138,0,0.08)",
                        pointerEvents: "none",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -80,
                        right: 80,
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: "rgba(255,138,0,0.05)",
                        pointerEvents: "none",
                    }}
                />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <VerifiedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                    <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                        Plataforma de Crédito
                    </Typography>
                </Box>

                <Typography
                    variant="h3"
                    fontWeight={900}
                    sx={{ mb: 2, lineHeight: 1.2, fontSize: { xs: "2rem", md: "2.8rem" } }}
                >
                    Recebíveis
                    <Box component="span" sx={{ color: "secondary.main" }}> Multimoedas</Box>
                </Typography>

                <Typography sx={{ maxWidth: 560, color: "rgba(255,255,255,0.7)", mb: 4, fontSize: "1.05rem", lineHeight: 1.7 }}>
                    Precifique recebíveis, realize liquidações financeiras e consulte
                    históricos de operações com segurança e precisão decimal.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate("/pricing")}
                        sx={{ px: 4, fontWeight: 700 }}
                    >
                        Nova Simulação
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/liquidation")}
                        sx={{
                            px: 4,
                            fontWeight: 700,
                            borderColor: "rgba(255,255,255,0.4)",
                            color: "white",
                            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" },
                        }}
                    >
                        Liquidação
                    </Button>
                </Box>

                {/* Métricas */}
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mt: 5, mb: 4 }} />
                <Grid container spacing={3}>
                    {stats.map(({ value, label }) => (
                        <Grid item xs={6} md={3} key={label}>
                            <Typography variant="h5" fontWeight={800} sx={{ color: "secondary.main" }}>
                                {value}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 0.5 }}>
                                {label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Cards de funcionalidades */}
            <Grid container spacing={3}>
                {features.map(({ icon, title, description, action, path }) => (
                    <Grid item xs={12} md={4} key={title}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 4,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 4,
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 3,
                                    bgcolor: "rgba(255,138,0,0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                }}
                            >
                                {icon}
                            </Box>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flexGrow: 1 }}>
                                {description}
                            </Typography>
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() => navigate(path)}
                                sx={{ mt: 3, alignSelf: "flex-start", fontWeight: 700, px: 0 }}
                            >
                                {action} →
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
