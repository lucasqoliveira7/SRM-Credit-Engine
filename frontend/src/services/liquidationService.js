import api from "../api/axios";

export async function liquidateReceivable(data) {
    const response = await api.post("/api/liquidations", data);
    return response.data;
}