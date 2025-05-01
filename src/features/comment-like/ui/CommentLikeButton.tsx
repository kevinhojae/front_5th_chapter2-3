import { ThumbsUp } from "lucide-react"

import { Comment } from "@entities/comment/model/comment"
import { useCommentQuery } from "@entities/comment/model/useCommentQuery"

import { Button } from "@shared/ui"

import { safeExecute } from "@/shared/lib/safeExecute"

import { likeComment } from "../api/likeComment"
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
