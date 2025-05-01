import { fetcher } from "@shared/lib"
import { PaginatedResponse } from "@/shared/lib/hooks/usePaginationParams"

import { Post } from "../model/post"

export const fetchPosts = async (limit: number, skip: number) => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", limit.toString())
  searchParams.set("skip", skip.toString())

  const data = await fetcher<PaginatedResponse<Post, "posts">>(`/api/posts?${searchParams.toString()}`)
  return data
}
