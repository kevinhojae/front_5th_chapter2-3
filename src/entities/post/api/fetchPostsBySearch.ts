import { fetcher } from "@shared/lib"
import { PaginatedResponse } from "@/shared/lib/hooks/usePaginationParams"

import { PostWithAuthor } from "../model/postWithAuthor"

export const fetchPostsBySearch = async (searchQuery: string) => {
  const data = await fetcher<PaginatedResponse<PostWithAuthor, "posts">>(`/api/posts/search?q=${searchQuery}`)
  return data
}
