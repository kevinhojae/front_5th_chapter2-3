import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/post"
import { PostEditForm } from "./PostEditForm"

interface PostEditModalProps {
  selectedPost: Post | null
  showEditDialog: boolean
  setShowEditDialog: (showEditDialog: boolean) => void
}

export function PostEditModal({ selectedPost, showEditDialog, setShowEditDialog }: PostEditModalProps) {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        {selectedPost && <PostEditForm post={selectedPost} onUpdate={() => setShowEditDialog(false)} />}
      </DialogContent>
    </Dialog>
  )
}
