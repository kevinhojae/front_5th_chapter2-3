import { PaginatedResponse } from "@shared/lib/utility-types"

import { User } from "../model/user"

export const fetchUsers = async (): Promise<PaginatedResponse<User, "users">> => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", "0")
  searchParams.set("select", "username,image")

  const response = await fetch(`/api/users?${searchParams.toString()}`)
  const data = await response.json()
  return data
}
