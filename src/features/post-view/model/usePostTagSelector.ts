import { useLocation, useNavigate } from "react-router-dom"
import { usePosts } from "./PostProvider"
import { usePostFilters } from "./FilterProvider"

export const usePostTagSelector = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { getPostsOfSelectedTag } = usePosts()
  const { selectedTag, setSelectedTag } = usePostFilters()

  const updateURL = () => {
    const params = new URLSearchParams(location.search)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  const handleTagSelect = async (tag: string) => {
    setSelectedTag(tag)
    getPostsOfSelectedTag(tag)
    updateURL()
  }

  return { handleTagSelect }
}
