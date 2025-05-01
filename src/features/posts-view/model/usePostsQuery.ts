import { useQuery, useQueryClient } from "@tanstack/react-query"

import { usePaginationParams } from "@shared/lib/hooks/usePaginationParams"

import { PostWithAuthor } from "../api/adaptPostWithAuthor"
import { fetchPostsWithAutherBySearch } from "../api/fetchPostsWithAutherBySearch"
import { fetchPostsWithAuthor } from "../api/fetchPostsWithAuthor"
import { fetchPostsWithAuthorByTag } from "../api/fetchPostsWithAuthorByTag"
import { usePostFiltersParams } from "./usePostFilterParams"

export function usePostsQuery() {
  const { limit, skip, setTotal } = usePaginationParams()
  const { searchQuery, selectedTag, sortBy, sortOrder } = usePostFiltersParams()

  const queryKey = ["posts", { limit, skip, searchQuery, selectedTag, sortBy, sortOrder }]

  const query = useQuery<PostWithAuthor[]>({
    queryKey,
    queryFn: async () => {
      const fetchers = {
        search: async () => searchQuery && fetchPostsWithAutherBySearch(searchQuery),
        tag: async () => selectedTag && selectedTag !== "all" && fetchPostsWithAuthorByTag(selectedTag),
        default: async () => fetchPostsWithAuthor(limit, skip),
      }

      const { posts, total } = (await fetchers.search()) || (await fetchers.tag()) || (await fetchers.default())

      setTotal(total)
      return posts
    },
  })

  const queryClient = useQueryClient()

  const setPosts = (updater: (prevPosts: PostWithAuthor[]) => PostWithAuthor[]) => {
    queryClient.setQueryData<PostWithAuthor[]>(queryKey, (prevPosts) => updater(prevPosts || []))
  }

  return { ...query, setPosts }
}
