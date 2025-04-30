import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchComments } from "../api/fetchComments"
import { Comment } from "./comment"

type PostId = number

export const useCommentQuery = (postId?: PostId) => {
  const queryClient = useQueryClient()

  const queryKey = ["comments", postId]

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey,
    queryFn: async () => {
      if (!postId) return []
      const { comments } = await fetchComments(postId)
      return comments
    },
    enabled: postId != null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  })

  const setQueryData = (updater: (oldData: Comment[]) => Comment[]) => {
    queryClient.setQueryData<Comment[]>(queryKey, (oldData) => updater(oldData || []))
  }

  return {
    comments,
    setQueryData,
  }
}
