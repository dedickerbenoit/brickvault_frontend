import api from "./api";
import { API_ROUTES } from "@/constants";

export interface DashboardStats {
  sets_count: number;
  total_value: string;
  collections_count: number;
  wishlist_count: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get<DashboardStats>(API_ROUTES.DASHBOARD.STATS);
  return data;
}
