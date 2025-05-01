import { usePaginationParams } from "@shared/lib/hooks/usePaginationParams"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui"

export function TablePaginator() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <LimitSelector />
        <span>항목</span>
      </div>
      <PageController />
    </div>
  )
}

const LIMIT_OPTIONS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
]

function LimitSelector() {
  const { limit, handleLimitChange } = usePaginationParams()

  return (
    <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        {LIMIT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function PageController() {
  const { isFirstPage, isLastPage, handlePreviousPageClick, handleNextPageClick } = usePaginationParams()

  return (
    <div className="flex gap-2">
      <Button disabled={isFirstPage} onClick={handlePreviousPageClick}>
        이전
      </Button>
      <Button disabled={isLastPage} onClick={handleNextPageClick}>
        다음
      </Button>
    </div>
  )
}
