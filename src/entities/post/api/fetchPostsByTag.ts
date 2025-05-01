import { PaginatedResponse, fetcher } from "@shared/lib"

import { Post } from "../model/post"

export const fetchPostsByTag = async (tag: string) => {
  const data = await fetcher<PaginatedResponse<Post, "posts">>(`/api/posts/tag/${tag}`)
  return data
}
