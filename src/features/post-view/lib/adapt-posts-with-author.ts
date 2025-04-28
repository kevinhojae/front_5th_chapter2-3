import { PostWithAuthor } from "../model/post-with-author"

import { Post } from "../../../entities/post/model/post"
import { User } from "../../../entities/user/model/user"

export const adaptPostWithAuthor = (post: Post, users: User[]): PostWithAuthor => {
  return {
    ...post,
    author: users.find((user) => user.id === post.userId)!,
  }
}
