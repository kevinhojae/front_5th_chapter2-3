import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { fetcher } from "@/shared/lib/fetcher"

import { Post } from "../model/post"

export const fetchPostsByTag = async (tag: string) => {
  const data = await fetcher<PaginatedResponse<Post, "posts">>(`/api/posts/tag/${tag}`)
  return data
}
