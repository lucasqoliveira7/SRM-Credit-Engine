import api from "../api/axios";

export async function getLiquidationStatement(filters = {}, page = 0, size = 10) {
    const response = await api.get("/api/liquidations", {
        params: { ...filters, page, size },
    });

    return response.data;
}
