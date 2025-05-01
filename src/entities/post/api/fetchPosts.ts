import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { Post } from "../model/post"

export const fetchPosts = async (limit: number, skip: number): Promise<PaginatedResponse<Post, "posts">> => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", limit.toString())
  searchParams.set("skip", skip.toString())

  const response = await fetch(`/api/posts?${searchParams.toString()}`)
  const data = await response.json()
  return data
}
