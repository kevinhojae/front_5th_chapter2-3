import { useCallback } from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useUserQuery } from "../../../entities/user/model/useUserQuery"
import { User } from "../../../entities/user/model/user"
import UserPreview from "../ui/UserPreview"

export const useUserDetailModal = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const UserPreviewCallback = useCallback(
    ({ user }: { user: User }) => (
      <UserPreview
        user={user}
        onClick={() => {
          setSelectedUserId(user.id)
          setShowUserModal(true)
        }}
      />
    ),
    [setShowUserModal],
  )

  const UserDetailModalCallback = useCallback(
    () => (
      <UserDetailModal userId={selectedUserId!} showUserModal={showUserModal} setShowUserModal={setShowUserModal} />
    ),
    [showUserModal, setShowUserModal, selectedUserId],
  )

  return {
    UserPreview: UserPreviewCallback,
    UserDetailModal: UserDetailModalCallback,
  }
}

function UserDetailModal({
  userId,
  showUserModal,
  setShowUserModal,
}: {
  userId: number
  showUserModal: boolean
  setShowUserModal: (showUserModal: boolean) => void
}) {
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

function UserDetail({ userId }: { userId: number }) {
  const { data: user } = useUserQuery(userId)

  return (
    <div className="space-y-4">
      <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {user?.firstName} {user?.lastName}
        </p>
        <p>
          <strong>나이:</strong> {user?.age}
        </p>
        <p>
          <strong>이메일:</strong> {user?.email}
        </p>
        <p>
          <strong>전화번호:</strong> {user?.phone}
        </p>
        <p>
          <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
        </p>
        <p>
          <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
        </p>
      </div>
    </div>
  )
}
