import { getPostsByTag } from "../../../entities/post/api/get-posts-by-tag"
import { getUsers } from "../../../entities/user/api/get-users"
import { adaptPostWithAuthor } from "../lib/adapt-posts-with-author"
import { PostWithAuthor } from "../model/post-with-author"

export const getPostsWithAuthorByTag = async (tag: string): Promise<PostWithAuthor[]> => {
  const { posts } = await getPostsByTag(tag)
  const { users } = await getUsers()

  return adaptPostWithAuthor(posts, users)
}
