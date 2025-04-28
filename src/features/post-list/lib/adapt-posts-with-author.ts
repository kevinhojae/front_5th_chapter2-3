import { PostWithAuthor } from "../model/post-with-author"

import { Post } from "../../../entities/post/model/post"
import { User } from "../../../entities/user/model/user"

export const adaptPostWithAuthor = (posts: Post[], users: User[]): PostWithAuthor[] => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId)!,
  }))
}
