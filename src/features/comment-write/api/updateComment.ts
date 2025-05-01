import { Comment } from "@entities/comment/model/comment"

import { fetcher } from "@/shared/lib/fetcher"

export const updateComment = async (comment: Comment) => {
  const data = await fetcher<Comment>(`/api/comments/${comment.id}`, {
    method: "PUT",
    body: JSON.stringify({ body: comment.body }),
  })
  return data
}
