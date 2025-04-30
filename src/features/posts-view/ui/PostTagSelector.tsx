import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilters } from "../model/PostFilterContext"
import { usePosts } from "../model/PostContext"
import { usePostTagSelector } from "../model/usePostTagSelector"

export function PostTagSelector() {
  const { tags } = usePosts()
  const { selectedTag } = usePostFilters()
  const { handleTagSelect } = usePostTagSelector()

  return (
    <Select value={selectedTag || "all"} onValueChange={handleTagSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
