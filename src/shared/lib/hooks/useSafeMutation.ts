import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { CustomError } from "../error"

export const useSafeMutation = <TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    ...options,
    onError: (error, variables, context) => {
      console.error(error)

      if (error instanceof CustomError) {
        toast.error(error.message)
        return
      }

      toast.error("예상치 못한 오류가 발생했습니다")
      options?.onError?.(error, variables, context)
    },
  })
}
