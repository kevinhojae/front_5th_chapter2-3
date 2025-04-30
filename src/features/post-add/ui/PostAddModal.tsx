import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { PostAddForm } from "./PostAddForm"

interface PostAddModalProps {
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
}

export function PostAddModal({ showAddDialog, setShowAddDialog }: PostAddModalProps) {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <PostAddForm closePostAddModal={() => setShowAddDialog(false)} />
      </DialogContent>
    </Dialog>
  )
}
