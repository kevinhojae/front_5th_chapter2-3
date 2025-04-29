import { PaginatedResponse } from "../../../shared/lib/utility-types"
import { Post } from "../model/post"

export const fetchPostsByTag = async (tag: string): Promise<PaginatedResponse<Post, "posts">> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}
