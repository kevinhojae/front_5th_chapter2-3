import { Plus } from "lucide-react"

import { Button } from "@shared/ui"

interface PostAddButtonProps {
  onClick: () => void
}

export function PostAddButton({ onClick }: PostAddButtonProps) {
  return (
    <Button onClick={onClick}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
