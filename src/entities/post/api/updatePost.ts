import { Post } from "@entities/post"

import { fetcher } from "@shared/lib/fetcher"

import { PostWithAuthor } from "../model/postWithAuthor"

export const updatePost = async (updatedPost: Post) => {
  const data = await fetcher<PostWithAuthor>(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  return data
}
