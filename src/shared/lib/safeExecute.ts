import { toast } from "react-toastify"

import { CustomError } from "./error"

export const safeExecute = <T, Args extends unknown[]>(fn: (...args: Args) => Promise<T>) => {
  return async (...args: Args): Promise<T | undefined> => {
    try {
      return await fn(...args)
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(error)
        toast.error(error.message)
      }
    }
  }
}
