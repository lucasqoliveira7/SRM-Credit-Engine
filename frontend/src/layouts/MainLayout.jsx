import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography
} from "@mui/material";

import { Link } from "react-router-dom";

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
                }}
            >
                <Toolbar sx={{ minHeight: 72 }}>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            flexGrow: 1
                        }}
                    >
                        SRM Credit Engine
                    </Typography>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Dashboard
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/pricing"
                    >
                        Simulação
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/liquidation"
                    >
                        Liquidação
                    </Button>

                    <Button color="inherit" component={Link} to="/statement">
                          Extrato
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 3 }}
                    >
                        API Online
                    </Button>

                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                {children}
            </Container>
        </Box>
    );
}

export default MainLayout;