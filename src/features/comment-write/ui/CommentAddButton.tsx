import { Plus } from "lucide-react"

import { Button } from "@shared/ui"

interface CommentAddButtonProps {
  onClick: () => void
}

export function CommentAddButton({ onClick }: CommentAddButtonProps) {
  return (
    <Button size="sm" onClick={onClick}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
