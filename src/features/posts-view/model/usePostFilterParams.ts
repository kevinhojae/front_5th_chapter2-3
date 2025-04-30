import { useSearchParams } from "react-router-dom"

export const usePostFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || ""
  const selectedTag = searchParams.get("tag") || ""
  const searchQuery = searchParams.get("search") || ""

  const setSearchQuery = (searchQuery: string) => {
    searchParams.set("search", searchQuery)
    setSearchParams(searchParams)
  }

  const setSortBy = (sortBy: string) => {
    searchParams.set("sortBy", sortBy)
    setSearchParams(searchParams)
  }

  const setSortOrder = (sortOrder: string) => {
    searchParams.set("sortOrder", sortOrder)
    setSearchParams(searchParams)
  }

  const setSelectedTag = (selectedTag: string) => {
    searchParams.set("tag", selectedTag)
    setSearchParams(searchParams)
  }

  return { searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag }
}
