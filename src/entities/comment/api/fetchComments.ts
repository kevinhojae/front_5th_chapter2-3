import { PaginatedResponse } from "@shared/lib/hooks/usePaginationParams"

import { Comment } from "../model/comment"

export const fetchComments = async (postId: number): Promise<PaginatedResponse<Comment, "comments">> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}
