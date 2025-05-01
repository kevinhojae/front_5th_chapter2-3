import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { addPost } from "@entities/post"

import { usePostsWithAuthorQuery } from "@features/posts-view/model/usePostsWithAuthorQuery"
import { useSafeMutation } from "@shared/lib"

export const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  userId: z.number().min(1),
})

export const usePostAddForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
  })

  const { setPosts } = usePostsWithAuthorQuery()

  const mutation = useSafeMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      setPosts((prev) => [data, ...prev])
    },
  })

  return { form, handleAddPost: mutation.mutate }
}
