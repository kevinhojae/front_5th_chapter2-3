import { Trash2 } from "lucide-react"

import { Comment } from "@entities/comment/model/comment"
import { useCommentQuery } from "@entities/comment/model/useCommentQuery"

import { Button } from "@shared/ui"

import { safeExecute } from "@/shared/lib/safeExecute"

import { deleteComment } from "../api/deleteComment"

interface CommentDeleteButtonProps {
  postId: number
  comment: Comment
}

export function CommentDeleteButton({ comment, postId }: CommentDeleteButtonProps) {
  const { setQueryData } = useCommentQuery(postId)

  const handleDeleteComment = safeExecute(async () => {
    await deleteComment(comment.id)
    setQueryData((prev) => prev.filter((c) => c.id !== comment.id))
  })

  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
