import { toast } from "react-toastify"

import { CustomError } from "./error"

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
  try {
    return await fn()
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error)
      toast.error(error.message)
    }
  }
}
