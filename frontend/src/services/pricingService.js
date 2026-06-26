import api from "../api/axios";

export async function simulatePricing(data) {
    const response = await api.post("/api/pricing/simulate", data);
    return response.data;
}