import { Comment } from "../../../entities/comment/model/comment"

export const updateComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    body: JSON.stringify({ body: comment.body }),
  })

  const data = await response.json()
  return data
}
