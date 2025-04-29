import { fetchPostsByTag } from "../../../entities/post/api/fetchPostsByTag"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { adaptPostWithAuthor } from "./adaptPostWithAuthor"
import { PostWithAuthor } from "../model/post-with-author"
import { PaginatedResponse } from "../../../shared/lib/utility-types"

export const fetchPostsWithAuthorByTag = async (tag: string): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await fetchPostsByTag(tag)
  const { users } = await fetchUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
