import { Pagination } from "../../../shared/lib/pagination/model/pagination"
import { Comment } from "../model/comment"

export const getComments = async (postId: string): Promise<Pagination<Comment, "comments">> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}
