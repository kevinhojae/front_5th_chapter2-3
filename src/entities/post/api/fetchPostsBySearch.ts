import { PostWithAuthor } from "@features/posts-view/api/adaptPostWithAuthor"

import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

export const fetchPostsBySearch = async (searchQuery: string): Promise<PaginatedResponse<PostWithAuthor, "posts">> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}
