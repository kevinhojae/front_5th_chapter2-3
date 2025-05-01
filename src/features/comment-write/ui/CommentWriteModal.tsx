import { Comment } from "@entities/comment/model"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"

import { CommentWriteForm } from "./CommentWriteForm"

interface CommentWriteModalProps {
  postId: number
  commentToEdit: Comment | null
  showCommentWriteModal: boolean
  setShowCommentWriteModal: (show: boolean) => void
}

export function CommentWriteModal({
  postId,
  commentToEdit,
  showCommentWriteModal,
  setShowCommentWriteModal,
}: CommentWriteModalProps) {
  return (
    <Dialog open={showCommentWriteModal} onOpenChange={setShowCommentWriteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <CommentWriteForm comment={commentToEdit} postId={postId} onComplete={() => setShowCommentWriteModal(false)} />
      </DialogContent>
    </Dialog>
  )
}
