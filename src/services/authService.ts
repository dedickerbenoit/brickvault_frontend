import api from "./api";
import { API_ROUTES } from "@/constants";

interface LoginResponse {
    message: string;
    access_token: string;
    token_type: string;
    user: {
        id: number;
        first_name: string;
        name: string;
        email: string;
        created_at: string
    }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, { email, password });
    return data;
}

export interface RegisterData {
    first_name: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface RegisterResponse {
    message: string;
    user: {
        id: number;
        first_name: string;
        name: string;
        email: string;
        created_at: string
    }
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
    const { data: responseData } = await api.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, data);
    return responseData;
}