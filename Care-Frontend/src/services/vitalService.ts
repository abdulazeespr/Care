import api from "./api";
import type { Vital, ApiResponse } from "../types";

export const getVitals = async (parentId: string) => {
    const res = await api.get<ApiResponse<Vital[]>>(`/vitals/${parentId}`);
    return res.data.data; // Vital[]
};

export const getLatestVital = async (parentId: string) => {
    const res = await api.get<ApiResponse<Vital | null>>(`/vitals/latest/${parentId}`);
    return res.data.data; // Vital | null
};

export const createVital = async (
    parentId: string,
    data: { heartRate: number; spo2: number; bodyTemperature: number }
) => {
    const res = await api.post<ApiResponse<Vital>>(`/vitals/${parentId}`, data);
    return res.data.data; // saved Vital
};
