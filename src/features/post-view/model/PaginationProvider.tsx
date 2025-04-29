import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

type UsePaginationType = {
  limit: number
  skip: number
  total: number
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setTotal: (total: number) => void

  isFirstPage: boolean
  isLastPage: boolean
  handleLimitChange: (value: number) => void
  handlePreviousPageClick: () => void
  handleNextPageClick: () => void
}

const DEFAULT_LIMIT = 10

const PaginationContext = createContext<UsePaginationType>({
  limit: DEFAULT_LIMIT,
  skip: 0,
  total: 0,
  setLimit: () => {},
  setSkip: () => {},
  setTotal: () => {},

  isFirstPage: true,
  isLastPage: false,
  handleLimitChange: () => {},
  handlePreviousPageClick: () => {},
  handleNextPageClick: () => {},
})

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)

  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)

  const isFirstPage = skip === 0
  const isLastPage = skip + limit >= total

  const updateURL = (limit: number, skip: number) => {
    if (limit) queryParams.set("limit", limit.toString())
    if (skip) queryParams.set("skip", skip.toString())
    navigate(`?${queryParams.toString()}`)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    updateURL(newLimit, skip)
  }

  // TODO: merge to handlePageClick(direction: "previous" | "next")
  const handlePreviousPageClick = () => {
    const newSkip = Math.max(0, skip - limit)
    setSkip(newSkip)
    updateURL(limit, newSkip)
  }

  const handleNextPageClick = () => {
    const newSkip = skip + limit
    setSkip(newSkip)
    updateURL(limit, newSkip)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
  }, [location.search])

  return (
    <PaginationContext.Provider
      value={{
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
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = (): UsePaginationType => {
  const context = useContext(PaginationContext)

  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider")
  }

  return context
}
