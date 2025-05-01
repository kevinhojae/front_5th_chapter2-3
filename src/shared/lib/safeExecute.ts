import { toast } from "react-toastify"

import { CustomError } from "./error"

export const safeExecute = <T, Args extends unknown[]>(fn: (...args: Args) => Promise<T>) => {
  return async (...args: Args): Promise<T | undefined> => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error(error)

      if (error instanceof CustomError) {
        toast.error(error.message)
        return
      }

      toast.error("예상치 못한 오류가 발생했습니다")
    }
  }
}
