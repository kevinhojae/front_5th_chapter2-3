import { Edit2 } from "lucide-react"
import { Button } from "../../../shared/ui"

interface PostEditButtonProps {
  onClick: () => void
}

export function PostEditButton({ onClick }: PostEditButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
