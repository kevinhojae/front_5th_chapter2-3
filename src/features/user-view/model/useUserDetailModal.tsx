import { useCallback } from "react"

import { useState } from "react"
import { User } from "../../../entities/user/model/user"
import { UserPreview } from "../ui/UserPreview"
import { UserDetailModal } from "../ui/UserDetailModal"

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
