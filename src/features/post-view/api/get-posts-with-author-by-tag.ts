import { getPostsByTag } from "../../../entities/post/api/get-posts-by-tag"
import { getUsers } from "../../../entities/user/api/get-users"
import { adaptPostWithAuthor } from "./adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"
import { PaginatedResponse } from "../../../shared/lib/utility-types"

export const getPostsWithAuthorByTag = async (tag: string): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await getPostsByTag(tag)
  const { users } = await getUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
