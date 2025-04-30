import { usePosts } from "./PostContext"
import { usePostFiltersParams } from "./usePostFilterParams"

export const usePostTagSelector = () => {
  const { getPostsOfSelectedTag } = usePosts()
  const { setSelectedTag } = usePostFiltersParams()

  const handleTagSelect = async (tag: string) => {
    setSelectedTag(tag)
    getPostsOfSelectedTag(tag)
  }

  return { handleTagSelect }
}
