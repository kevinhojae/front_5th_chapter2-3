import { useForm } from "react-hook-form"
import { z } from "zod"
import { Post } from "../../../entities/post/model/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePost } from "../api"
import { usePosts } from "../../posts-view/model/PostContext"

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

  const { setPosts } = usePosts()

  const handlePostUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

  return {
    form,
    handlePostUpdate,
  }
}
