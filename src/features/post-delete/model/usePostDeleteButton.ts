import { usePostsQuery } from "@features/posts-view/model/usePostsQuery"

import { deletePost } from "@entities/post"
import { Post } from "@entities/post"

import { safeExecute } from "@shared/lib/safeExecute"

interface UsePostDeleteButtonProps {
  post: Post
}

export const usePostDeleteButton = ({ post }: UsePostDeleteButtonProps) => {
  const { setPosts } = usePostsQuery()

  const handleDelete = safeExecute(async () => {
    await deletePost(post.id)
    setPosts((prev) => prev.filter((p) => p.id !== post.id))
  })

  return { handleDelete }
}
