import { User } from "@entities/user"

export type Comment = {
  id: number
  postId: number
  body: string
  likes: number
  user: Omit<User, "image">
}
