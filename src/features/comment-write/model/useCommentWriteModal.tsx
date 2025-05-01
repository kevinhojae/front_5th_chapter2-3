import { useCallback, useState } from "react"

import { Comment } from "@entities/comment"

import { CommentAddButton } from "../ui/CommentAddButton"
import { CommentEditButton } from "../ui/CommentEditButton"
import { CommentWriteModal } from "../ui/CommentWriteModal"

export const useCommentWriteModal = (postId: number) => {
  const [showCommentWriteModal, setShowCommentWriteModal] = useState(false)
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null)

  const CommentWriteModalCallback = useCallback(() => {
    return (
      <CommentWriteModal
        showCommentWriteModal={showCommentWriteModal}
        setShowCommentWriteModal={setShowCommentWriteModal}
        commentToEdit={commentToEdit}
        postId={postId}
      />
    )
  }, [showCommentWriteModal, setShowCommentWriteModal, commentToEdit, postId])

  const CommentAddButtonCallback = useCallback(() => {
    return (
      <CommentAddButton
        onClick={() => {
          setCommentToEdit(null)
          setShowCommentWriteModal(true)
        }}
      />
    )
  }, [])

  const CommentEditButtonCallback = useCallback(({ comment }: { comment: Comment }) => {
    return (
      <CommentEditButton
        onClick={() => {
          setCommentToEdit(comment)
          setShowCommentWriteModal(true)
        }}
      />
    )
  }, [])

  return {
    showCommentWriteModal,
    setShowCommentWriteModal,
    commentToEdit,
    setCommentToEdit,
    CommentWriteModal: CommentWriteModalCallback,
    CommentAddButton: CommentAddButtonCallback,
    CommentEditButton: CommentEditButtonCallback,
  }
}
