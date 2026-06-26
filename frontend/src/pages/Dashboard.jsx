import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Paper,
    Typography
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    mb: 4,
                    borderRadius: 3,
                    bgcolor: "primary.dark",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Plataforma de Recebíveis Multimoedas
                </Typography>

                <Typography sx={{ maxWidth: 720, color: "rgba(255,255,255,0.8)" }}>
                    Simule precificação, calcule deságio e registre liquidações
                    com segurança, rastreabilidade e precisão decimal.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
                    {[
                        { label: "Nova Simulação", path: "/pricing" },
                        { label: "Liquidação", path: "/liquidation" },
                    ].map(({ label, path }) => (
                        <Button
                            key={label}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate(path)}
                            sx={{ minWidth: 140, px: 3 }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 3, display: "flex", alignItems: "center", gap: 3 }}>
                <Box
                    sx={{
                        minWidth: 72,
                        height: 72,
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ArticleIcon sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>
                <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                    Sistema desenvolvido para simular uma plataforma de cessão de crédito multimoedas capaz de
                    precificar recebíveis, realizar liquidações financeiras e consultar históricos de operações de forma
                    segura, auditável e escalável.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Dashboard;
