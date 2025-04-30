import { Comment } from "../../../entities/comment/model/comment"

export const likeComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comment.likes + 1 }),
  })
  const data = await response.json()
  return data
}
