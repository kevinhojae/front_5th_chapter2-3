import { fetcher } from "@/shared/lib/fetcher"

import { UserDetail } from "../model/userDetail"

export const fetchUserDetail = async (id: number) => {
  const data = await fetcher<UserDetail>(`/api/users/${id}`)
  return data
}
