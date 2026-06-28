import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalculateIcon from "@mui/icons-material/Calculate";
import DescriptionIcon from "@mui/icons-material/Description";
import BoltIcon from "@mui/icons-material/Bolt";

import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon fontSize="small" /> },
    { label: "Simulação", to: "/pricing", icon: <CalculateIcon fontSize="small" /> },
    { label: "Liquidação", to: "/liquidation", icon: <DescriptionIcon fontSize="small" /> },
];

function MainLayout({ children }) {
    const location = useLocation();

    return (
        <Box minHeight="100vh" bgcolor="background.default">
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: "linear-gradient(90deg, #071126 0%, #1B2356 100%)",
                    borderBottom: "3px solid",
                    borderColor: "secondary.main",
                    borderRadius: 0,
                    width: "100%",
                }}
            >
                    <Toolbar disableGutters sx={{ minHeight: 72, px: 4, width: "100%" }}>

                        {/* Logo — canto esquerdo total */}
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                flexGrow: 1,
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    bgcolor: "secondary.main",
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 14px rgba(255,138,0,0.35)",
                                }}
                            >
                                <BoltIcon sx={{ color: "primary.dark", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                                    SRM Credit Engine
                                </Typography>
                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", letterSpacing: 1 }}>
                                    PLATAFORMA DE CRÉDITO
                                </Typography>
                            </Box>
                        </Box>

                        {/* Nav — canto direito total */}
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                            {navItems.map(({ label, to, icon }) => {
                                const active = location.pathname === to;
                                return (
                                    <Button
                                        key={label}
                                        component={Link}
                                        to={to}
                                        startIcon={icon}
                                        sx={{
                                            px: 2.5,
                                            py: 1,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            fontSize: "0.875rem",
                                            color: active ? "primary.dark" : "white",
                                            bgcolor: active ? "secondary.main" : "transparent",
                                            border: "1.5px solid",
                                            borderColor: active ? "secondary.main" : "rgba(255,255,255,0.3)",
                                            "&:hover": {
                                                bgcolor: "secondary.main",
                                                borderColor: "secondary.main",
                                                color: "primary.dark",
                                            },
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                        </Box>
                    </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                {children}
            </Container>
        </Box>
    );
}

export default MainLayout;
