import { PostWithAuthor } from "@features/posts-view/api/adaptPostWithAuthor"

import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { fetcher } from "@/shared/lib/fetcher"

export const fetchPostsBySearch = async (searchQuery: string) => {
  const data = await fetcher<PaginatedResponse<PostWithAuthor, "posts">>(`/api/posts/search?q=${searchQuery}`)
  return data
}
