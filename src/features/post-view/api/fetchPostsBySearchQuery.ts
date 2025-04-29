import { PaginatedResponse } from "../../../shared/lib/utility-types"
import { PostWithAuthor } from "../model/post-with-author"

export const fetchPostsBySearchQuery = async (
  searchQuery: string,
): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}
