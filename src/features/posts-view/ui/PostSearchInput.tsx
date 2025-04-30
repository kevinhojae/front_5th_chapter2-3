import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostSearchInput } from "../model/usePostSearchInput"

export function PostSearchInput() {
  const { searchQuery, setSearchQuery, handlePostSearch } = usePostSearchInput()

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handlePostSearch(e)}
      />
    </div>
  )
}
