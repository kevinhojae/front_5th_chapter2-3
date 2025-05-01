import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { usePostsQuery } from "@features/posts-view/model/usePostsQuery"

import { safeExecute } from "@/shared/lib/safeExecute"

import { addPost } from "../api/addPost"

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

  const { setPosts } = usePostsQuery()

  const handleAddPost = safeExecute(async (newPost: z.infer<typeof formSchema>) => {
    const addedPost = await addPost(newPost)
    setPosts((prev) => [addedPost, ...prev])
  })

  return { form, handleAddPost }
}
