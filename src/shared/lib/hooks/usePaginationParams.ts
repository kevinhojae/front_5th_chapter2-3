import { useSearchParams } from "react-router-dom"

export function usePaginationParams() {
  const [params, setParams] = useSearchParams()

  const limit = parseInt(params.get("limit") || "10")
  const skip = parseInt(params.get("skip") || "0")
  const total = parseInt(params.get("total") || "0")

  const isFirstPage = skip === 0
  const isLastPage = skip + limit >= total

  const setLimit = (value: number) => {
    params.set("limit", value.toString())
    setParams(params)
  }

  const setSkip = (value: number) => {
    params.set("skip", value.toString())
    setParams(params)
  }

  const setTotal = (value: number) => {
    params.set("total", value.toString())
    setParams(params)
  }

  const handleLimitChange = (value: number) => setLimit(value)
  const handlePreviousPageClick = () => setSkip(Math.max(0, skip - limit))
  const handleNextPageClick = () => setSkip(skip + limit)

  return {
    limit,
    skip,
    total,
    setLimit,
    setSkip,
    setTotal,
    isFirstPage,
    isLastPage,
    handleLimitChange,
    handlePreviousPageClick,
    handleNextPageClick,
  }
}
