import { getPosts } from "../../../entities/post/api/get-posts"
import { getUsers } from "../../../entities/user/api/get-users"
import { adaptPostWithAuthor } from "../lib/adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"

export const getPostsWithAuthor = async (limit: number, skip: number): Promise<PostWithAuthor[]> => {
  const { posts } = await getPosts(limit, skip)
  const { users } = await getUsers()

  return adaptPostWithAuthor(posts, users)
}
