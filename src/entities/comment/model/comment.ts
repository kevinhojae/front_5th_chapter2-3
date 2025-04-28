import { User } from "../../user/@x/comment"

export type Comment = {
  id: string
  postId: string
  body: string
  user: Omit<User, "image">
}
