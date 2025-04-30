import { usePostTagSelector } from "../model/usePostTagSelector"

interface PostTagProps {
  tag: string
  selectedTag: string
}

export function PostTag({ tag, selectedTag }: PostTagProps) {
  const { handleTagSelect } = usePostTagSelector()

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => handleTagSelect(tag)}
    >
      {tag}
    </span>
  )
}
