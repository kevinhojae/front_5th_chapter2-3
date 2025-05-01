import { PostWithAuthor } from "@features/posts-view/api/adaptPostWithAuthor"

import { Post } from "@entities/post/model/post"

type AddPostDTO = Pick<Post, "title" | "body" | "userId">

export const addPost = async (newPost: AddPostDTO): Promise<PostWithAuthor> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })

  const data = await response.json()

  // TODO: error handling
  return data
}
