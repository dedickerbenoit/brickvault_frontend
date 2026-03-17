import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWishlist,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  markWishlistPurchased,
} from "@/services/wishlistService";
import type {
  StoreWishlistPayload,
  UpdateWishlistPayload,
  MarkPurchasedPayload,
  WishlistListResponse,
} from "@/services/wishlistService";

export function useWishlist(page: number = 1) {
  return useQuery({
    queryKey: ["wishlist", page],
    queryFn: () => getWishlist(page),
    staleTime: 30 * 1000,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StoreWishlistPayload) => createWishlistItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateWishlistPayload;
    }) => updateWishlistItem(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousQueries = queryClient.getQueriesData<WishlistListResponse>({
        queryKey: ["wishlist"],
      });

      queryClient.setQueriesData<WishlistListResponse>(
        { queryKey: ["wishlist"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === id ? { ...item, ...payload } : item,
            ),
          };
        },
      );

      return { previousQueries };
    },
    onError: (_err, _vars, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWishlistItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useMarkWishlistPurchased() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: MarkPurchasedPayload }) =>
      markWishlistPurchased(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["user-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
