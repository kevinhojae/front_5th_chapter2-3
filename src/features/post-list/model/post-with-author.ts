import { Post } from "../../../entities/post/model/post"
import { User } from "../../../entities/user/model/user"

export type PostWithAuthor = Post & {
  author: User
}
