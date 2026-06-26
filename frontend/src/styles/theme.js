import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1B2356",
            dark: "#071126",
            light: "#203A75",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#FF8A00",
            dark: "#F57C00",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#F3F6FA",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#101828",
            secondary: "#667085",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h4: {
            fontWeight: 800,
        },
        h5: {
            fontWeight: 700,
        },
        button: {
            fontWeight: 700,
            textTransform: "none",
        },
    },
    shape: {
        borderRadius: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "10px 22px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                },
            },
        },
    },
});

export default theme;