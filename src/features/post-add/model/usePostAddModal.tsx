import { useCallback, useState } from "react"

import { Post } from "@entities/post"

import { PostAddButton } from "../ui/PostAddButton"
import { PostAddModal } from "../ui/PostAddModal"

export type NewPost = Pick<Post, "title" | "body" | "userId">

export const usePostAddModal = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const PostAddModalCallback = useCallback(
    () => <PostAddModal showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} />,
    [showAddDialog, setShowAddDialog],
  )

  const PostAddButtonCallback = useCallback(
    () => <PostAddButton openPostAddModal={() => setShowAddDialog(true)} />,
    [setShowAddDialog],
  )

  return {
    PostAddModal: PostAddModalCallback,
    PostAddButton: PostAddButtonCallback,
  }
}
