import { usePostsWithAuthorQuery } from "@/features/posts-view/model/usePostsWithAuthorQuery"

import { deletePost } from "@entities/post"
import { Post } from "@entities/post"

import { safeExecute } from "@shared/lib"

interface UsePostDeleteButtonProps {
  post: Post
}

export const usePostDeleteButton = ({ post }: UsePostDeleteButtonProps) => {
  const { setPosts } = usePostsWithAuthorQuery()

  const handleDelete = safeExecute(async () => {
    await deletePost(post.id)
    setPosts((prev) => prev.filter((p) => p.id !== post.id))
  })

  return { handleDelete }
}
