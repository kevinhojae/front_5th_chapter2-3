import { PaginatedResponse, fetcher } from "@shared/lib"

import { PostWithAuthor } from "../model/postWithAuthor"

export const fetchPostsBySearch = async (searchQuery: string) => {
  const data = await fetcher<PaginatedResponse<PostWithAuthor, "posts">>(`/api/posts/search?q=${searchQuery}`)
  return data
}
