import { useQuery } from "@tanstack/react-query"

import { fetchTags } from "@entities/post/api/fetchTags"

export function useTagsQuery() {
  const query = useQuery<{ url: string; slug: string; name: string }[]>({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })

  return query
}
