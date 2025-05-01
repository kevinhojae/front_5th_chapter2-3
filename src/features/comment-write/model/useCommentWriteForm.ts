import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Comment, addComment, updateComment, useCommentQuery } from "@entities/comment"

import { useSafeMutation } from "@shared/lib"

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

  const addCommentMutation = useSafeMutation({
    mutationFn: ({ body }: z.infer<typeof formSchema>) => addComment({ body, postId, userId: 1 }),
    onSuccess: (data) => {
      setQueryData((prev) => [...prev, data])
      onComplete()
    },
  })

  const updateCommentMutation = useSafeMutation({
    mutationFn: ({ body }: z.infer<typeof formSchema>) => updateComment({ ...comment!, body }),
    onSuccess: (data) => {
      setQueryData((prev) => updateCommentBody(prev, { updatedId: data.id, body: data.body }))
      onComplete()
    },
  })

  const handleCommentAdd = ({ body }: z.infer<typeof formSchema>) => {
    addCommentMutation.mutate({ body })
  }

  const handleCommentUpdate = ({ body }: z.infer<typeof formSchema>) => {
    updateCommentMutation.mutate({ body })
  }

  return {
    form,
    handleCommentAdd,
    handleCommentUpdate,
  }
}
