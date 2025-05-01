import { Controller } from "react-hook-form"
import { z } from "zod"

import { Button, Input, Textarea } from "@shared/ui"

import { formSchema, usePostAddForm } from "../model/usePostAddForm"

interface PostAddFormProps {
  closePostAddModal: () => void
}

export function PostAddForm({ closePostAddModal }: PostAddFormProps) {
  const {
    form: { control, handleSubmit },
    handleAddPost,
  } = usePostAddForm()

  const handleNewPostSubmit = (data: z.infer<typeof formSchema>) => {
    handleAddPost(data)
    closePostAddModal()
  }

  return (
    <form onSubmit={handleSubmit(handleNewPostSubmit)}>
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
            <Textarea rows={30} placeholder="내용" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="userId"
          render={({ field }) => (
            <Input type="number" placeholder="사용자 ID" value={field.value} onChange={field.onChange} />
          )}
        />
        <Button type="submit">게시물 추가</Button>
      </div>
    </form>
  )
}
