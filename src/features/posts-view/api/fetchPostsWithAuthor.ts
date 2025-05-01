import { PostWithAuthor, fetchPosts } from "@entities/post"
import { fetchUsers } from "@entities/user/api/fetchUsers"

import { PaginatedResponse } from "@shared/lib"

import { adaptPostWithAuthor } from "./adaptPostWithAuthor"

export const fetchPostsWithAuthor = async (
  limit: number,
  skip: number,
): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await fetchPosts(limit, skip)
  const { users } = await fetchUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
