import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostFilters } from "../model/FilterProvider"
import { usePostSortController } from "../model/usePostSortController"

const SORT_BY_OPTIONS = [
  { value: "none", label: "없음" },
  { value: "id", label: "ID" },
  { value: "title", label: "제목" },
  { value: "reactions", label: "반응" },
]

const SORT_ORDER_OPTIONS = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
]

export function PostSortController() {
  const { sortBy, sortOrder } = usePostFilters()
  const { handleSortByChange, handleSortOrderChange } = usePostSortController()

  return (
    <>
      <Select value={sortBy} onValueChange={handleSortByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          {SORT_BY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={handleSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
