import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { usePostsWithAuthorQuery } from "@/features/posts-view/model/usePostsWithAuthorQuery"

import { addPost } from "@entities/post"

import { safeExecute } from "@shared/lib"

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

  const handleAddPost = safeExecute(async (newPost: z.infer<typeof formSchema>) => {
    const addedPost = await addPost(newPost)
    setPosts((prev) => [addedPost, ...prev])
  })

  return { form, handleAddPost }
}
