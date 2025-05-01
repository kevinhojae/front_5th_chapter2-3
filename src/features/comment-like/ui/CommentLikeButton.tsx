import { ThumbsUp } from "lucide-react"

import { Comment, likeComment, useCommentQuery } from "@entities/comment"

import { useSafeMutation } from "@shared/lib"
import { Button } from "@shared/ui"

import { increaseCommentLike } from "../lib"

interface CommentLikeButtonProps {
  comment: Comment
}

export function CommentLikeButton({ comment }: CommentLikeButtonProps) {
  const { setQueryData } = useCommentQuery(comment.postId)

  const mutation = useSafeMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      setQueryData((prev) => increaseCommentLike(prev, comment.id))
    },
  })

  const handleCommentLike = () => {
    mutation.mutate(comment)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCommentLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
