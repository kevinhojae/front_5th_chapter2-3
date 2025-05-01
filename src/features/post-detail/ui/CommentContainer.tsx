import { CommentDeleteButton } from "@features/comment-delete"
import { CommentLikeButton } from "@features/comment-like"
import { useCommentWriteModal } from "@features/comment-write"

import { useCommentQuery } from "@entities/comment"

import { CommentList } from "./CommentList"

interface CommentContainerProps {
  postId: number
}

export function CommentContainer({ postId }: CommentContainerProps) {
  const { comments } = useCommentQuery(postId)
  const { CommentAddButton, CommentEditButton, CommentWriteModal } = useCommentWriteModal(postId)

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <CommentAddButton />
        </div>
        <div className="space-y-1">
          {comments && (
            <CommentList
              comments={comments}
              renderActionButtons={(comment) => (
                <>
                  <CommentLikeButton comment={comment} />
                  <CommentEditButton comment={comment} />
                  <CommentDeleteButton comment={comment} postId={postId} />
                </>
              )}
            />
          )}
        </div>
      </div>
      <CommentWriteModal />
    </>
  )
}
