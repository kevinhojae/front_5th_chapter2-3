import { useState } from "react"
import { useLocation } from "react-router-dom"

export const usePostSearch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")

  return { searchQuery, setSearchQuery }
}
