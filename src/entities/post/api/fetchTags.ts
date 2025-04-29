export const fetchTags = async (): Promise<{ url: string; slug: string; name: string }[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
