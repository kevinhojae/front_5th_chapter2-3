import { Pagination } from "../../../shared/lib/pagination/model/pagination"
import { User } from "../model/user"

export const getUsers = async (): Promise<Pagination<User, "users">> => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", "0")
  searchParams.set("select", "username,image")

  const response = await fetch(`/api/users?${searchParams.toString()}`)
  const data = await response.json()
  return data
}
