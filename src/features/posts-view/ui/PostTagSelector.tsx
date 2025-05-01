import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui"

import { usePostFiltersParams } from "../model/usePostFilterParams"
import { useTagsQuery } from "../model/useTagsQuery"

export function PostTagSelector() {
  const { data: tags } = useTagsQuery()
  const { selectedTag } = usePostFiltersParams()
  const { setSelectedTag } = usePostFiltersParams()

  return (
    <Select value={selectedTag || "all"} onValueChange={setSelectedTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
