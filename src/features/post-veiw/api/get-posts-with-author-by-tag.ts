import { fetchPostsByTag } from "../../../entities/post/api/fetchPostsByTag"
import { fetchUsers } from "../../../entities/user/api/fetchUsers"
import { adaptPostWithAuthor } from "../lib/adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"

export const getPostsWithAuthorByTag = async (tag: string): Promise<PostWithAuthor[]> => {
  const { posts } = await fetchPostsByTag(tag)
  const { users } = await fetchUsers()

  return adaptPostWithAuthor(posts, users)
}
