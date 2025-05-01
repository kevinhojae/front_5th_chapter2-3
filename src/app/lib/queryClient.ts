import { QueryCache, QueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message || "데이터를 불러오는데 실패했습니다")
    },
  }),
})
