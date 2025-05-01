import { PostWithAuthor, fetchPostsBySearch } from "@entities/post"
import { fetchUsers } from "@entities/user/api/fetchUsers"

import { PaginatedResponse } from "@shared/lib"

import { adaptPostWithAuthor } from "./adaptPostWithAuthor"

export const fetchPostsWithAutherBySearch = async (
  searchQuery: string,
): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await fetchPostsBySearch(searchQuery)
  const { users } = await fetchUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
