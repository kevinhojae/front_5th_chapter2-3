import { User } from "../../user/@x/comment"

export type Comment = {
  id: string
  postId: string
  body: string
  likes: number
  user: Omit<User, "image">
}
