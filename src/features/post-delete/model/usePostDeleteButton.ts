import { Post } from "../../../entities/post/model/post"
import { deletePost } from "../api"
import { usePostsQuery } from "../../posts-view/model/usePostsQuery"

interface UsePostDeleteButtonProps {
  post: Post
}

export const usePostDeleteButton = ({ post }: UsePostDeleteButtonProps) => {
  const { setPosts } = usePostsQuery()

  const handleDelete = async () => {
    try {
      await deletePost(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return { handleDelete }
}
