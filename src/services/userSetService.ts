import api from "./api";
import { API_ROUTES } from "@/constants";

export interface SetData {
  id: number;
  set_num: string;
  name: string;
  theme?: { id: number; name: string } | null;
  year?: number | null;
  num_parts?: number | null;
  img_url?: string | null;
}

export interface UserSetData {
  id: number;
  set: SetData;
  purchase_price: number | null;
  purchase_date: string | null;
  condition: "new" | "opened" | "built";
  notes: string | null;
  created_at: string;
}

export interface UserSetListResponse {
  data: UserSetData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface StoreUserSetPayload {
  set_num: string;
  purchase_price?: number | null;
  purchase_date?: string | null;
  condition: "new" | "opened" | "built";
  notes?: string | null;
}

export interface UpdateUserSetPayload {
  purchase_price?: number | null;
  purchase_date?: string | null;
  condition?: "new" | "opened" | "built";
  notes?: string | null;
}

export async function getUserSets(
  page: number = 1,
  perPage: number = 15,
): Promise<UserSetListResponse> {
  const { data } = await api.get<UserSetListResponse>(
    API_ROUTES.USER_SETS.LIST,
    { params: { page, per_page: perPage } },
  );
  return data;
}

export async function addUserSet(
  payload: StoreUserSetPayload,
): Promise<UserSetData> {
  const { data } = await api.post<{ data: UserSetData }>(
    API_ROUTES.USER_SETS.LIST,
    payload,
  );
  return data.data;
}

export async function updateUserSet(
  id: number,
  payload: UpdateUserSetPayload,
): Promise<UserSetData> {
  const { data } = await api.put<{ data: UserSetData }>(
    `${API_ROUTES.USER_SETS.LIST}/${id}`,
    payload,
  );
  return data.data;
}

export async function deleteUserSet(id: number): Promise<void> {
  await api.delete(`${API_ROUTES.USER_SETS.LIST}/${id}`);
}

export async function searchSets(query: string): Promise<SetData[]> {
  const { data } = await api.get<{ data: SetData[] }>(
    API_ROUTES.USER_SETS.SEARCH,
    { params: { q: query } },
  );
  return data.data;
}
