import { fetcher } from "@shared/lib/fetcher"
import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { Comment } from "../model/comment"

export const fetchComments = async (postId: number) => {
  const data = await fetcher<PaginatedResponse<Comment, "comments">>(`/api/comments/post/${postId}`)
  return data
}
