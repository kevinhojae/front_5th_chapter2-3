import { UserDetail } from "../model/userDetail"

export const fetchUserDetail = async (id: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}
