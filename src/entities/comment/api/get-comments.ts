import { PaginatedResponse } from "../../../shared/lib/utility-types"
import { Comment } from "../model/comment"

export const getComments = async (postId: string): Promise<PaginatedResponse<Comment, "comments">> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}
