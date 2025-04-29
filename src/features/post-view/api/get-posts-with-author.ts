import { getPosts } from "../../../entities/post/api/get-posts"
import { getUsers } from "../../../entities/user/api/get-users"
import { adaptPostWithAuthor } from "./adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"
import { PaginatedResponse } from "../../../shared/lib/utility-types"

export const getPostsWithAuthor = async (
  limit: number,
  skip: number,
): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const data = await getPosts(limit, skip)
  const { users } = await getUsers()

  const postsWithAuthor = data.posts.map((post) => adaptPostWithAuthor(post, users))

  return { ...data, posts: postsWithAuthor }
}
