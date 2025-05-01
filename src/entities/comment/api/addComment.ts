import { Comment } from "@entities/comment"

import { fetcher } from "@shared/lib"

type NewComment = Omit<Comment, "id" | "likes" | "user"> & {
  postId: number | null
  userId: number | null
}

export const addComment = async (comment: NewComment) => {
  const data = await fetcher<Comment>("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return data
}
