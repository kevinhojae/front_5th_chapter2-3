import { Post } from "@entities/post"
import { PostWithAuthor } from "@entities/post"
import { User } from "@entities/user"

export const adaptPostWithAuthor = (post: Post, users: User[]): PostWithAuthor => {
  return {
    ...post,
    author: users.find((user) => user.id === post.userId)!,
  }
}
