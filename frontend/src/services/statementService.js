import api from "../api/axios";

export async function getLiquidationStatement(filters = {}) {
    const response = await api.get("/api/liquidations", {
        params: filters,
    });

    return response.data;
}