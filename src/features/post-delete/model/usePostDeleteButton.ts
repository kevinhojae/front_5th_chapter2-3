import { usePostsWithAuthorQuery } from "@features/posts-view/model/usePostsWithAuthorQuery"

import { deletePost } from "@entities/post"
import { Post } from "@entities/post"

import { useSafeMutation } from "@shared/lib"

interface UsePostDeleteButtonProps {
  post: Post
}

export const usePostDeleteButton = ({ post }: UsePostDeleteButtonProps) => {
  const { setPosts } = usePostsWithAuthorQuery()

  const mutation = useSafeMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    },
  })

  const handleDelete = () => {
    mutation.mutate(post.id)
  }

  return { handleDelete }
}
