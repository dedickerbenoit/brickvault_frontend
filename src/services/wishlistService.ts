import api from "./api";
import { API_ROUTES } from "@/constants";
import type { SetData, UserSetData } from "./userSetService";

export interface WishlistItemData {
  id: number;
  set: SetData;
  priority: number;
  target_price: number | null;
  url: string | null;
  notes: string | null;
  created_at: string;
}

export interface WishlistListResponse {
  data: WishlistItemData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface StoreWishlistPayload {
  set_num: string;
  priority?: number;
  target_price?: number | null;
  url?: string | null;
  notes?: string | null;
}

export interface UpdateWishlistPayload {
  priority?: number;
  target_price?: number | null;
  url?: string | null;
  notes?: string | null;
}

export interface MarkPurchasedPayload {
  purchase_price?: number | null;
  purchase_date?: string | null;
  condition: "new" | "opened" | "built";
  notes?: string | null;
}

export async function getWishlist(
  page: number = 1,
  perPage: number = 15,
): Promise<WishlistListResponse> {
  const { data } = await api.get<WishlistListResponse>(
    API_ROUTES.WISHLISTS.LIST,
    { params: { page, per_page: perPage } },
  );
  return data;
}

export async function createWishlistItem(
  payload: StoreWishlistPayload,
): Promise<WishlistItemData> {
  const { data } = await api.post<{ data: WishlistItemData }>(
    API_ROUTES.WISHLISTS.LIST,
    payload,
  );
  return data.data;
}

export async function updateWishlistItem(
  id: number,
  payload: UpdateWishlistPayload,
): Promise<WishlistItemData> {
  const { data } = await api.put<{ data: WishlistItemData }>(
    `${API_ROUTES.WISHLISTS.LIST}/${id}`,
    payload,
  );
  return data.data;
}

export async function deleteWishlistItem(id: number): Promise<void> {
  await api.delete(`${API_ROUTES.WISHLISTS.LIST}/${id}`);
}

export async function markWishlistPurchased(
  id: number,
  payload: MarkPurchasedPayload,
): Promise<UserSetData> {
  const { data } = await api.post<{ data: UserSetData }>(
    `${API_ROUTES.WISHLISTS.LIST}/${id}/mark-purchased`,
    payload,
  );
  return data.data;
}
