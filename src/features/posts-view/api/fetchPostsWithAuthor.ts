import { fetchPosts } from "@entities/post/api/fetchPosts"
import { fetchUsers } from "@entities/user/api/fetchUsers"

import { PaginatedResponse } from "@shared/lib/utility-types"

import { adaptPostWithAuthor } from "./adaptPostWithAuthor"
import { PostWithAuthor } from "./adaptPostWithAuthor"

export const fetchPostsWithAuthor = async (
  limit: number,
  skip: number,
): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await fetchPosts(limit, skip)
  const { users } = await fetchUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
