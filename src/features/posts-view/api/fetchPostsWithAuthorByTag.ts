import { fetchPostsByTag } from "@entities/post/api/fetchPostsByTag"
import { fetchUsers } from "@entities/user/api/fetchUsers"

import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { adaptPostWithAuthor } from "./adaptPostWithAuthor"
import { PostWithAuthor } from "./adaptPostWithAuthor"

export const fetchPostsWithAuthorByTag = async (tag: string): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await fetchPostsByTag(tag)
  const { users } = await fetchUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
