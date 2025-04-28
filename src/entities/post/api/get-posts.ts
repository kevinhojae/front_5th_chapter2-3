import { Pagination } from "../../../shared/lib/pagination/model/pagination"
import { Post } from "../model/post"

export const getPosts = async (limit: number, skip: number): Promise<Pagination<Post, "posts">> => {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", limit.toString())
  searchParams.set("skip", skip.toString())

  const response = await fetch(`/api/posts?${searchParams.toString()}`)
  const data = await response.json()
  return data
}
