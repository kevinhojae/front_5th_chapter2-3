import { handleErrorResponse } from "./error"

export const fetcher = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw handleErrorResponse(response)
  }

  const data = await response.json()
  return data
}
