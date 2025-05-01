import { Comment } from "@entities/comment"

import { fetcher } from "@shared/lib/fetcher"

export const likeComment = async (comment: Comment) => {
  const data = await fetcher<Comment>(`/api/comments/${comment.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comment.likes + 1 }),
  })
  return data
}
