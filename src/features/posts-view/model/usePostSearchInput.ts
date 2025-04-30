import { useLocation, useNavigate } from "react-router-dom"
import { fetchPostsBySearchQuery } from "../api/fetchPostsBySearchQuery"
import { fetchPostsWithAuthor } from "../api/fetchPostsWithAuthor"
import { usePagination } from "./PaginationContext"
import { usePosts } from "./PostContext"
import { usePostFilters } from "./PostFilterContext"

export const usePostSearchInput = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { setLoading, setPosts } = usePosts()
  const { limit, skip, setTotal } = usePagination()
  const { searchQuery, setSearchQuery } = usePostFilters()

  const updateURL = () => {
    const params = new URLSearchParams(location.search)
    if (searchQuery) params.set("search", searchQuery)
    navigate(`?${params.toString()}`)
  }

  const handlePostSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true)

      try {
        const { posts, total } = searchQuery
          ? await fetchPostsBySearchQuery(searchQuery)
          : await fetchPostsWithAuthor(limit, skip)

        setPosts(posts)
        setTotal(total)
        updateURL()
      } catch (error) {
        console.error("게시물 검색 오류:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  return { handlePostSearch, searchQuery, setSearchQuery }
}
