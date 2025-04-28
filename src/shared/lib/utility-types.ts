export type PaginatedResponse<T, AccesorKey extends string = "items"> = {
  [key in AccesorKey]: T[]
} & {
  total: number
  skip: number
  limit: number
}
