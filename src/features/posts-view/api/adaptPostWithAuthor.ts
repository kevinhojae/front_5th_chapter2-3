import { Post } from "../../../entities/post/model/post"
import { User } from "../../../entities/user/model/user"

export type PostWithAuthor = Post & {
  author: User
}

export const adaptPostWithAuthor = (post: Post, users: User[]): PostWithAuthor => {
  return {
    ...post,
    author: users.find((user) => user.id === post.userId)!,
  }
}
