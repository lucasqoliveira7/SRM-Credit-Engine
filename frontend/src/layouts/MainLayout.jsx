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
import ListAltIcon from "@mui/icons-material/ListAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import BoltIcon from "@mui/icons-material/Bolt";

import { Link } from "react-router-dom";

const navItems = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon fontSize="small" /> },
    { label: "Simulação", to: "/pricing", icon: <CalculateIcon fontSize="small" /> },
    { label: "Liquidação", to: "/liquidation", icon: <DescriptionIcon fontSize="small" /> },
    { label: "Extrato", to: "/statement", icon: <ListAltIcon fontSize="small" /> },
    { label: "Câmbio", to: "/currency-rates", icon: <CurrencyExchangeIcon fontSize="small" /> },
];

function MainLayout({ children }) {
    return (
        <Box minHeight="100vh" bgcolor="background.default">
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: "primary.main",
                    borderBottom: "4px solid",
                    borderColor: "secondary.main",
                    borderRadius: 0,
                    width: "100%",
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 72,
                        gap: 1,
                        px: 0,
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1, px: 2 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "secondary.main",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <BoltIcon sx={{ color: "primary.main", fontSize: 26 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            SRM Credit Engine
                        </Typography>
                    </Box>

                    {navItems.map(({ label, to, icon }) => (
                        <Button
                            key={label}
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={to}
                            startIcon={icon}
                            sx={{
                                borderRadius: 0,
                                px: 2.5,
                                minWidth: 130,
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                {children}
            </Container>
        </Box>
    );
}

export default MainLayout;
