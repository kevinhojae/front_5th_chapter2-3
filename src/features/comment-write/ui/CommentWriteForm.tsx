import { Controller } from "react-hook-form"

import { Comment } from "@entities/comment/model/comment"

import { Button, Textarea } from "@shared/ui"

import { useCommentWriteForm } from "../model/useCommentWriteForm"

export function CommentWriteForm({
  comment,
  postId,
  onComplete,
}: {
  comment: Comment | null
  postId: number
  onComplete: () => void
}) {
  const { form, handleCommentAdd, handleCommentUpdate } = useCommentWriteForm({
    comment,
    postId,
    onComplete,
  })

  return (
    <form onSubmit={form.handleSubmit(comment ? handleCommentUpdate : handleCommentAdd)}>
      <div className="space-y-4">
        <Controller
          control={form.control}
          name="body"
          render={({ field }) => <Textarea placeholder="댓글 내용" {...field} />}
        />
        <Button type="submit">{comment ? "댓글 업데이트" : "댓글 추가"}</Button>
      </div>
    </form>
  )
}
