import { Trash2 } from "lucide-react"

import { Post } from "@entities/post"

import { Button } from "@shared/ui"

import { usePostDeleteButton } from "../model"

interface PostDeleteButtonProps {
  post: Post
}

export function PostDeleteButton({ post }: PostDeleteButtonProps) {
  const { handleDelete } = usePostDeleteButton({ post })

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
