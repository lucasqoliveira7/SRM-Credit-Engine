import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Grid,
    Paper,
    Typography
} from "@mui/material";

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
                    <Button variant="contained" color="secondary" onClick={() => navigate("/pricing")}>
                        Nova Simulação
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => navigate("/liquidation")}>
                        Liquidação
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => navigate("/statement")}>
                        Extrato
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Valor Operado
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                            R$ 7.000.000,00
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Liquidações Realizadas
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                            67
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Moedas Suportadas
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                            BRL / USD
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;