import { UserDetail } from "../model/user-detail"

export const getUserDetail = async (id: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}
