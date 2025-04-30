import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostSearchInput } from "../model/usePostSearchInput"
import { Controller } from "react-hook-form"

export function PostSearchInput() {
  const { form, handlePostSearch } = usePostSearchInput()

  return (
    <div className="relative flex-1">
      <form onSubmit={form.handleSubmit(handlePostSearch)}>
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Controller
          control={form.control}
          name="query"
          render={({ field }) => (
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </form>
    </div>
  )
}
