import { useState } from "react"

type UsePaginationType = {
  limit: number
  skip: number
  total: number
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setTotal: (total: number) => void
}

export const usePagination = (): UsePaginationType => {
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)

  return { limit, skip, setLimit, setSkip, total, setTotal }
}
