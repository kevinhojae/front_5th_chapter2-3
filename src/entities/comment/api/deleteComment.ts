import { fetcher } from "@shared/lib"

export const deleteComment = async (id: number) => {
  const data = await fetcher<Comment>(`/api/comments/${id}`, {
    method: "DELETE",
  })
  return data
}
