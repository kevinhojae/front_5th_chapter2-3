import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePaginationParams } from "../../../shared/lib/hooks/usePaginationParams"
import { usePostFiltersParams } from "./usePostFilterParams"
import { fetchPostsWithAuthorByTag } from "../api/fetchPostsWithAuthorByTag"
import { fetchPostsWithAuthor } from "../api/fetchPostsWithAuthor"
import { PostWithAuthor } from "../api/adaptPostWithAuthor"
import { fetchPostsBySearchQuery } from "../api/fetchPostsBySearchQuery"

export function usePostsQuery() {
  const { limit, skip, setTotal } = usePaginationParams()
  const { searchQuery, selectedTag, sortBy, sortOrder } = usePostFiltersParams()

  const query = useQuery<PostWithAuthor[]>({
    queryKey: ["posts", { limit, skip, searchQuery, selectedTag, sortBy, sortOrder }],
    queryFn: async () => {
      console.log("searchQuery, selectedTag", searchQuery, selectedTag)
      if (searchQuery) {
        const { posts, total } = await fetchPostsBySearchQuery(searchQuery)
        setTotal(total)
        return posts
      }

      if (selectedTag && selectedTag !== "all") {
        const { posts, total } = await fetchPostsWithAuthorByTag(selectedTag)
        setTotal(total)
        return posts
      }

      const { posts, total } = await fetchPostsWithAuthor(limit, skip)
      setTotal(total)
      return posts
    },
  })

  const queryClient = useQueryClient()

  const setPosts = (updater: (prevPosts: PostWithAuthor[]) => PostWithAuthor[]) => {
    queryClient.setQueryData<PostWithAuthor[]>(
      ["posts", { limit, skip, searchQuery, selectedTag, sortBy, sortOrder }],
      (prevPosts) => updater(prevPosts || []),
    )
  }

  return { ...query, setPosts }
}
