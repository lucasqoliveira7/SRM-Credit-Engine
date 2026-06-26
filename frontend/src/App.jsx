import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import PricingPage from "./pages/PricingPage";
import LiquidationPage from "./pages/LiquidationPage";
function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/liquidation" element={<LiquidationPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;