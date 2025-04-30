import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"

interface PostAddButtonProps {
  openPostAddModal: () => void
}

export function PostAddButton({ openPostAddModal }: PostAddButtonProps) {
  return (
    <Button onClick={openPostAddModal}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
