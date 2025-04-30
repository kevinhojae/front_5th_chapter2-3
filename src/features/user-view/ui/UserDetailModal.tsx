import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserDetail } from "./UserDetail"

interface UserDetailModalProps {
  userId: number
  showUserModal: boolean
  setShowUserModal: (showUserModal: boolean) => void
}

export function UserDetailModal({ userId, showUserModal, setShowUserModal }: UserDetailModalProps) {
  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserDetail userId={userId} />
      </DialogContent>
    </Dialog>
  )
}
