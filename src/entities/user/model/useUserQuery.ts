import { useQuery } from "@tanstack/react-query"

import { fetchUserDetail } from "../api/fetchUserDetail"

export const useUserQuery = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserDetail(userId),
  })

  return {
    data,
    isLoading,
    error,
  }
}
