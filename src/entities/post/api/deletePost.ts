import { Post } from "@entities/post"

import { fetcher } from "@shared/lib"

export const deletePost = async (id: number) => {
  const data = await fetcher<Post>(`/api/posts/${id}`, {
    method: "DELETE",
  })
  return data
}
