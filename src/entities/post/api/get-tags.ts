export const getTags = async (): Promise<string[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
