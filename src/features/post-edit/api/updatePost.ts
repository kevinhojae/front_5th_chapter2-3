import { Post } from "@entities/post/model/post"

export const updatePost = async (updatedPost: Post) => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  const data = await response.json()

  // TODO: error handling
  return data
}
