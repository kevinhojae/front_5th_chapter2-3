import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type PostFilterContextType = {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
}

const PostFilterContext = createContext<PostFilterContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
  sortBy: "",
  setSortBy: () => {},
  sortOrder: "",
  setSortOrder: () => {},
  selectedTag: "",
  setSelectedTag: () => {},
})

export const PostFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <PostFilterContext.Provider
      value={{ searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag }}
    >
      {children}
    </PostFilterContext.Provider>
  )
}

export const usePostFilters = () => {
  const context = useContext(PostFilterContext)
  if (!context) {
    throw new Error("usePostFilters must be used within a PostFilterProvider")
  }
  return context
}
