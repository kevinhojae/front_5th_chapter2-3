import { User } from "@entities/user"

import { Post } from "./post"

export type PostWithAuthor = Post & {
  author: User
}
