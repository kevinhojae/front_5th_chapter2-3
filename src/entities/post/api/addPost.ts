import { Post } from "@entities/post"

import { fetcher } from "@shared/lib"

import { PostWithAuthor } from "../model/postWithAuthor"

type AddPostDTO = Pick<Post, "title" | "body" | "userId">

export const addPost = async (newPost: AddPostDTO) => {
  const data = await fetcher<PostWithAuthor>("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return data
}
