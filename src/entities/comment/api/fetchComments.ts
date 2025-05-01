import { PaginatedResponse, fetcher } from "@shared/lib"

import { Comment } from "../model/comment"

export const fetchComments = async (postId: number) => {
  const data = await fetcher<PaginatedResponse<Comment, "comments">>(`/api/comments/post/${postId}`)
  return data
}
