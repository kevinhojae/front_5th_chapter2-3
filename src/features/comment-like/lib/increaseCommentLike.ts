import { Comment } from "@entities/comment"

export const increaseCommentLike = (comments: Comment[], commentId: number) => {
  return comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
}
