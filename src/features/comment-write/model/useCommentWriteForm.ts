import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Comment, addComment, updateComment, useCommentQuery } from "@entities/comment"

import { safeExecute } from "@shared/lib"

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

  const handleCommentAdd = safeExecute(async ({ body }: z.infer<typeof formSchema>) => {
    const newComment = {
      body,
      postId,
      userId: 1,
    }
    const addedComment = await addComment(newComment)

    setQueryData((prev) => [...prev, addedComment])
    onComplete()
  })

  const handleCommentUpdate = safeExecute(async ({ body }: z.infer<typeof formSchema>) => {
    const updatedComment = await updateComment({
      ...comment!,
      body,
    })

    setQueryData((prev) => updateCommentBody(prev, { updatedId: updatedComment.id, body }))
    onComplete()
  })

  return {
    form,
    handleCommentAdd,
    handleCommentUpdate,
  }
}
