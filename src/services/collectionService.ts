import api from "./api";
import { API_ROUTES } from "@/constants";
import type { CollectionColor } from "@/constants";
import type { UserSetData } from "./userSetService";

export interface CollectionData {
  id: number;
  name: string;
  description: string | null;
  color: CollectionColor;
  sets_count: number;
  user_sets?: UserSetData[];
  created_at: string;
}

export interface StoreCollectionPayload {
  name: string;
  description?: string | null;
  color: CollectionColor;
}

export interface UpdateCollectionPayload {
  name?: string;
  description?: string | null;
  color?: CollectionColor;
}

export async function getCollections(): Promise<CollectionData[]> {
  const { data } = await api.get<{ data: CollectionData[] }>(
    API_ROUTES.COLLECTIONS.LIST,
  );
  return data.data;
}

export async function getCollection(id: number): Promise<CollectionData> {
  const { data } = await api.get<{ data: CollectionData }>(
    `${API_ROUTES.COLLECTIONS.LIST}/${id}`,
  );
  return data.data;
}

export async function createCollection(
  payload: StoreCollectionPayload,
): Promise<CollectionData> {
  const { data } = await api.post<{ data: CollectionData }>(
    API_ROUTES.COLLECTIONS.LIST,
    payload,
  );
  return data.data;
}

export async function updateCollection(
  id: number,
  payload: UpdateCollectionPayload,
): Promise<CollectionData> {
  const { data } = await api.put<{ data: CollectionData }>(
    `${API_ROUTES.COLLECTIONS.LIST}/${id}`,
    payload,
  );
  return data.data;
}

export async function deleteCollection(id: number): Promise<void> {
  await api.delete(`${API_ROUTES.COLLECTIONS.LIST}/${id}`);
}

export async function addSetToCollection(
  collectionId: number,
  userSetId: number,
): Promise<void> {
  await api.post(`${API_ROUTES.COLLECTIONS.LIST}/${collectionId}/sets`, {
    user_set_id: userSetId,
  });
}

export async function removeSetFromCollection(
  collectionId: number,
  userSetId: number,
): Promise<void> {
  await api.delete(
    `${API_ROUTES.COLLECTIONS.LIST}/${collectionId}/sets/${userSetId}`,
  );
}
