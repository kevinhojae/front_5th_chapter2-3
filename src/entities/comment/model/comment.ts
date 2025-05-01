import { User } from "@entities/user/@x/comment"

export type Comment = {
  id: number
  postId: number
  body: string
  likes: number
  user: Omit<User, "image">
}
