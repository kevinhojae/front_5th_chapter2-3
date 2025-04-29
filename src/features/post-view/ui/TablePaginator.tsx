import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../shared/ui"
import { Button } from "../../../shared/ui/button"
import { usePagination } from "../lib/PaginationProvider"

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

function LimitSelector() {
  const { limit, handleLimitChange } = usePagination()

  return (
    <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  )
}

function PageController() {
  const { isFirstPage, isLastPage, handlePreviousPageClick, handleNextPageClick } = usePagination()

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
