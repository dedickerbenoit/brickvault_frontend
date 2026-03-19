import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addSetToCollection,
  removeSetFromCollection,
} from "@/services/collectionService";
import type {
  StoreCollectionPayload,
  UpdateCollectionPayload,
} from "@/services/collectionService";

export function useCollections(userSetId?: number) {
  return useQuery({
    queryKey: userSetId
      ? ["collections", { userSetId }]
      : ["collections"],
    queryFn: () => getCollections(userSetId),
    staleTime: 30 * 1000,
  });
}

export function useCollection(id: number) {
  return useQuery({
    queryKey: ["collections", id],
    queryFn: () => getCollection(id),
    staleTime: 30 * 1000,
    enabled: !!id,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StoreCollectionPayload) => createCollection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCollectionPayload;
    }) => updateCollection(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useAddSetToCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      userSetId,
    }: {
      collectionId: number;
      userSetId: number;
    }) => addSetToCollection(collectionId, userSetId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.collectionId],
      });
    },
  });
}

export function useRemoveSetFromCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      userSetId,
    }: {
      collectionId: number;
      userSetId: number;
    }) => removeSetFromCollection(collectionId, userSetId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.collectionId],
      });
    },
  });
}
