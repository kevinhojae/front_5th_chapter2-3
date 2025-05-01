import { Post } from "@/entities/post/model/post"
import { fetcher } from "@/shared/lib/fetcher"

export const deletePost = async (id: number) => {
  const data = await fetcher<Post>(`/api/posts/${id}`, {
    method: "DELETE",
  })
  return data
}
