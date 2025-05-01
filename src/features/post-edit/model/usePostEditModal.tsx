import { useCallback, useState } from "react"

import { Post } from "@entities/post"

import { PostEditButton } from "../ui/PostEditButton"
import { PostEditModal } from "../ui/PostEditModal"

export const usePostEditModal = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const PostEditModalCallback = useCallback(
    () => (
      <PostEditModal
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
      />
    ),
    [showEditDialog, setShowEditDialog, selectedPost],
  )

  const PostEditButtonCallback = useCallback(
    ({ post }: { post: Post }) => (
      <PostEditButton
        onClick={() => {
          setSelectedPost(post)
          setShowEditDialog(true)
        }}
      />
    ),
    [setSelectedPost, setShowEditDialog],
  )

  return { PostEditModal: PostEditModalCallback, PostEditButton: PostEditButtonCallback }
}
