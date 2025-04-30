import { usePostFiltersParams } from "../model/usePostFilterParams"

interface PostTagProps {
  tag: string
  selectedTag: string
}

export function PostTag({ tag, selectedTag }: PostTagProps) {
  const { setSelectedTag } = usePostFiltersParams()

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => setSelectedTag(tag)}
    >
      {tag}
    </span>
  )
}
