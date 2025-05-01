import { ThumbsUp } from "lucide-react"

import { Comment, likeComment, useCommentQuery } from "@entities/comment"

import { safeExecute } from "@shared/lib"
import { Button } from "@shared/ui"

import { increaseCommentLike } from "../lib"

interface CommentLikeButtonProps {
  comment: Comment
}

export function CommentLikeButton({ comment }: CommentLikeButtonProps) {
  const { setQueryData } = useCommentQuery(comment.postId)

  const handleCommentLike = safeExecute(async () => {
    await likeComment(comment)
    setQueryData((prev) => increaseCommentLike(prev, comment.id))
  })

  return (
    <Button variant="ghost" size="sm" onClick={handleCommentLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
