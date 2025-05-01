import { Trash2 } from "lucide-react"

import { Comment, deleteComment, useCommentQuery } from "@entities/comment"

import { useSafeMutation } from "@shared/lib"
import { Button } from "@shared/ui"

interface CommentDeleteButtonProps {
  postId: number
  comment: Comment
}

export function CommentDeleteButton({ comment, postId }: CommentDeleteButtonProps) {
  const { setQueryData } = useCommentQuery(postId)

  const mutation = useSafeMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      setQueryData((prev) => prev.filter((c) => c.id !== comment.id))
    },
  })

  const handleDeleteComment = () => {
    mutation.mutate(comment.id)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
