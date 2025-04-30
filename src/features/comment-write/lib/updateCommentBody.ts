import { Comment } from "../../../entities/comment/model/comment"

export const updateCommentBody = (
  comments: Comment[],
  {
    updatedId,
    body,
  }: {
    updatedId: number
    body: string
  },
) => {
  return comments.map((comment) =>
    comment.id === updatedId
      ? {
          ...comment,
          body,
        }
      : comment,
  )
}
