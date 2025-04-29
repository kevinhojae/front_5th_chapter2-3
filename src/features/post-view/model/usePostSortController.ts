import { useLocation, useNavigate } from "react-router-dom"
import { usePostFilters } from "./FilterProvider"

export const usePostSortController = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { sortBy, sortOrder, setSortBy, setSortOrder } = usePostFilters()

  const updateURL = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(location.search)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    navigate(`?${params.toString()}`)
  }

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    updateURL(newSortBy, sortOrder)
  }

  const handleSortOrderChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder)
    updateURL(sortBy, newSortOrder)
  }

  return { handleSortByChange, handleSortOrderChange }
}
