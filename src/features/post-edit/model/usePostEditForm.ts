import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { usePostsQuery } from "@features/posts-view/model/usePostsQuery"

import { updatePost } from "@entities/post"
import { Post } from "@entities/post"

import { safeExecute } from "@shared/lib"

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

  const { setPosts } = usePostsQuery()

  const handlePostUpdate = safeExecute(async (data: z.infer<typeof formSchema>) => {
    const updatedPost = await updatePost(data)
    setPosts((prev) =>
      prev.map((post) =>
        post.id === updatedPost.id
          ? {
              ...updatedPost,
              ...data,
            }
          : post,
      ),
    )
  })

  return {
    form,
    handlePostUpdate,
  }
}
