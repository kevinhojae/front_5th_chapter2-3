import { createContext, useContext, useState } from "react"

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

  const isFirstPage = skip === 0
  const isLastPage = skip + limit >= total

  const handleLimitChange = (value: number) => {
    setLimit(value)
  }

  const handlePreviousPageClick = () => {
    setSkip(Math.max(0, skip - limit))
  }

  const handleNextPageClick = () => {
    setSkip(skip + limit)
  }

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
