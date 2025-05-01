import { Post } from "@entities/post/model/post"

import { PostWithAuthor } from "@/features/posts-view/api/adaptPostWithAuthor"
import { fetcher } from "@/shared/lib/fetcher"

export const updatePost = async (updatedPost: Post) => {
  const data = await fetcher<PostWithAuthor>(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  return data
}
