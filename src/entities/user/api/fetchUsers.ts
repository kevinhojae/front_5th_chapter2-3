import { fetcher } from "@shared/lib/fetcher"
import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { User } from "../model/user"

export const fetchUsers = async () => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", "0")
  searchParams.set("select", "username,image")

  const data = await fetcher<PaginatedResponse<User, "users">>(`/api/users?${searchParams.toString()}`)
  return data
}
