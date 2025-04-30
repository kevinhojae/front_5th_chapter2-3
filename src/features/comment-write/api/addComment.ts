import { Comment } from "../../../entities/comment/model/comment"

type NewComment = Omit<Comment, "id" | "likes" | "user"> & {
  postId: number | null
  userId: number | null
}

export const addComment = async (comment: NewComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })

  const data = await response.json()
  return data
}
