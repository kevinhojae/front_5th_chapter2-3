import { fetchPosts } from "../../../entities/post/api/fetchPosts"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { adaptPostWithAuthor } from "../lib/adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"

export const getPostsWithAuthor = async (limit: number, skip: number): Promise<PostWithAuthor[]> => {
  const { posts } = await fetchPosts(limit, skip)
  const { users } = await fetchUsers()

  return adaptPostWithAuthor(posts, users)
}
