import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { deleteComment } from "../api/deleteComment"
import { Comment } from "../../../entities/comment/model/comment"
import { useCommentQuery } from "../../../entities/comment/model/useCommentQuery"

interface CommentDeleteButtonProps {
  postId: number
  comment: Comment
}

export function CommentDeleteButton({ comment, postId }: CommentDeleteButtonProps) {
  const { setQueryData } = useCommentQuery(postId)

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id)
      setQueryData((prev) => prev.filter((c) => c.id !== comment.id))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
