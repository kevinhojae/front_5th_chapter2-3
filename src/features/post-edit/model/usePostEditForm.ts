import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { usePostsWithAuthorQuery } from "@features/posts-view/model/usePostsWithAuthorQuery"

import { updatePost } from "@entities/post"
import { Post } from "@entities/post"

import { useSafeMutation } from "@shared/lib"

interface UsePostEditFormProps {
  post: Post
}

export const formSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  reactions: z.object({
    likes: z.number(),
    dislikes: z.number(),
  }),
  views: z.number(),
  userId: z.number(),
}) satisfies z.ZodType<Post>

export const usePostEditForm = ({ post }: UsePostEditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...post,
    },
  })

  const { setPosts } = usePostsWithAuthorQuery()

  const mutation = useSafeMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      setPosts((prev) => prev.map((post) => (post.id === data.id ? { ...data } : post)))
    },
  })

  return {
    form,
    handlePostUpdate: mutation.mutate,
  }
}
