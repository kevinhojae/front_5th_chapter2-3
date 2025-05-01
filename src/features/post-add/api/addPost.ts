import { PostWithAuthor } from "@features/posts-view/api/adaptPostWithAuthor"

import { Post } from "@entities/post/model/post"

import { fetcher } from "@/shared/lib/fetcher"

type AddPostDTO = Pick<Post, "title" | "body" | "userId">

export const addPost = async (newPost: AddPostDTO) => {
  const data = await fetcher<PostWithAuthor>("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return data
}
