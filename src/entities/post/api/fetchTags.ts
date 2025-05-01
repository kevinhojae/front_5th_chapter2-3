import { fetcher } from "@/shared/lib/fetcher"

import { Tag } from "../model/post"

export const fetchTags = async () => {
  const data = await fetcher<Tag[]>("/api/posts/tags")
  return data
}
