import { createContext, useContext, useState } from "react"

type UsePaginationType = {
  limit: number
  skip: number
  total: number
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setTotal: (total: number) => void
}

const DEFAULT_LIMIT = 10

const PaginationContext = createContext<UsePaginationType>({
  limit: DEFAULT_LIMIT,
  skip: 0,
  total: 0,
  setLimit: () => {},
  setSkip: () => {},
  setTotal: () => {},
})

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <PaginationContext.Provider value={{ limit, skip, total, setLimit, setSkip, setTotal }}>
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
