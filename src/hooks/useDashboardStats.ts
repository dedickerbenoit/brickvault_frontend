import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
    staleTime: 30 * 1000,
  });
}
