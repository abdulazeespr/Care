export interface Parent {
    _id: string;
    patientId: number;
    name: string;
    age: number;
    gender: "male" | "female" | "other";
    createdAt: string;
    updatedAt: string;
}

export interface Vital {
    _id: string;
    parentId: string;
    heartRate: number;
    spo2: number;
    bodyTemperature: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
}

/** Backend envelope for a single resource */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

/** Backend envelope for paginated lists */
export interface PaginatedApiResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        limit: number;
    };
}
