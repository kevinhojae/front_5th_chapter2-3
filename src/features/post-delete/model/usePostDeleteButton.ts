import { usePostsQuery } from "@features/posts-view/model/usePostsQuery"

import { Post } from "@entities/post/model/post"

import { safeExecute } from "@/shared/lib/safeExecute"

import { deletePost } from "../api"

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
