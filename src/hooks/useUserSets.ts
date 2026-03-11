import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUserSet,
  deleteUserSet,
  getUserSets,
  updateUserSet,
} from "@/services";
import type { StoreUserSetPayload, UpdateUserSetPayload } from "@/services";

export function useUserSets(page: number = 1, perPage: number = 15) {
  return useQuery({
    queryKey: ["user-sets", page, perPage],
    queryFn: () => getUserSets(page, perPage),
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useAddUserSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StoreUserSetPayload) => addUserSet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateUserSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateUserSetPayload;
    }) => updateUserSet(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useDeleteUserSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserSet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
