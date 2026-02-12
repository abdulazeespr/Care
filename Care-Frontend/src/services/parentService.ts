import api from "./api";
import type { Parent, PaginatedApiResponse, ApiResponse } from "../types";

export const getParents = async (page = 1, limit = 6, search = "") => {
    const res = await api.get<PaginatedApiResponse<Parent>>("/parents", {
        params: { page, limit, search },
    });
    return res.data; // { success, data, pagination }
};

export const getParentById = async (id: string) => {
    const res = await api.get<ApiResponse<Parent>>(`/parents/${id}`);
    return res.data.data; // Parent object
};

export const createParent = async (data: { name: string; age: number; gender: string }) => {
    const res = await api.post<ApiResponse<Parent>>("/parents", {
        ...data,
        gender: data.gender.toLowerCase(),
    });
    return res.data.data; // saved Parent
};
