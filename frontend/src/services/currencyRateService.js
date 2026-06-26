import api from "../api/axios";

export async function saveCurrencyRate(data) {
    const response = await api.post("/api/currency-rates", data);
    return response.data;
}

export async function getLatestRate(from, to) {
    const response = await api.get("/api/currency-rates/latest", {
        params: { from, to },
    });
    return response.data;
}
