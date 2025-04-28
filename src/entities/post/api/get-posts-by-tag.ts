import { Tag } from "../model/post"

export const getPostsByTag = async (tag: Tag) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}
