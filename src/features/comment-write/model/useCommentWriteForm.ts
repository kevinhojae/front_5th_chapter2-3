import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Comment } from "@entities/comment/model/comment"
import { useCommentQuery } from "@entities/comment/model/useCommentQuery"

import { updateComment } from "../api"
import { addComment } from "../api/addComment"
import { updateCommentBody } from "../lib/updateCommentBody"

const formSchema = z.object({
  body: z.string(),
})

export const useCommentWriteForm = ({
  comment,
  postId,
  onComplete,
}: {
  comment: Comment | null
  postId: number
  onComplete: () => void
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: comment?.body || "",
    },
  })

  const { setQueryData } = useCommentQuery(postId)

  const handleCommentAdd = async ({ body }: z.infer<typeof formSchema>) => {
    try {
      const newComment = {
        body,
        postId,
        userId: 1,
      }
      const addedComment = await addComment(newComment)

      setQueryData((prev) => [...prev, addedComment])
      onComplete()
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const handleCommentUpdate = async ({ body }: z.infer<typeof formSchema>) => {
    try {
      const updatedComment = await updateComment({
        ...comment!,
        body,
      })

      setQueryData((prev) => updateCommentBody(prev, { updatedId: updatedComment.id, body }))
      onComplete()
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }

  return {
    form,
    handleCommentAdd,
    handleCommentUpdate,
  }
}
