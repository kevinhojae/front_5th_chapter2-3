import { Edit2 } from "lucide-react"

import { Button } from "@shared/ui"

interface CommentEditButtonProps {
  onClick: () => void
}

export function CommentEditButton({ onClick }: CommentEditButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
