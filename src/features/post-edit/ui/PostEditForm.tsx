import { Controller } from "react-hook-form"
import { z } from "zod"

import { Post } from "@entities/post/model/post"

import { Button, Input, Textarea } from "@shared/ui"

import { formSchema, usePostEditForm } from "../model/usePostEditForm"

interface PostEditFormProps {
  post: Post
  onUpdate: () => void
}

export function PostEditForm({ post, onUpdate }: PostEditFormProps) {
  const {
    form: { control, handleSubmit },
    handlePostUpdate,
  } = usePostEditForm({ post })

  const handlePostUpdateSubmit = (data: z.infer<typeof formSchema>) => {
    handlePostUpdate(data)
    onUpdate()
  }

  return (
    <form onSubmit={handleSubmit(handlePostUpdateSubmit)}>
      <div className="space-y-4">
        <Controller
          control={control}
          name="title"
          render={({ field }) => <Input placeholder="제목" value={field.value} onChange={field.onChange} />}
        />
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <Textarea rows={15} placeholder="내용" value={field.value} onChange={field.onChange} />
          )}
        />
        <Button type="submit">게시물 업데이트</Button>
      </div>
    </form>
  )
}
