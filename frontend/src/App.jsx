import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import PricingPage from "./pages/PricingPage";
import LiquidationPage from "./pages/LiquidationPage";
import StatementPage from "./pages/StatementPage";
import CurrencyRatePage from "./pages/CurrencyRatePage";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/liquidation" element={<LiquidationPage />} />
                    <Route path="/statement" element={<StatementPage />} />
                    <Route path="/currency-rates" element={<CurrencyRatePage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;