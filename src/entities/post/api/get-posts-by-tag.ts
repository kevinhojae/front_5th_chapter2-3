export const getPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}
