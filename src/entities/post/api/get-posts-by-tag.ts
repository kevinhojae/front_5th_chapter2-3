import { Pagination } from "../../../shared/lib/pagination/model/pagination"
import { Post } from "../model/post"

export const getPostsByTag = async (tag: string): Promise<Pagination<Post, "posts">> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}
