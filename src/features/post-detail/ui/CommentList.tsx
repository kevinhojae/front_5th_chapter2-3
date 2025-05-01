import { usePostFiltersParams } from "@features/posts-view/model/usePostFilterParams"
import { HighlightedText } from "@features/posts-view/ui/HighlightedText"

import { Comment } from "@entities/comment"

export function CommentList({
  comments,
  renderActionButtons,
}: {
  comments: Comment[]
  renderActionButtons: (comment: Comment) => React.ReactNode
}) {
  const { searchQuery } = usePostFiltersParams()

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">
              <HighlightedText text={comment.body} highlight={searchQuery} />
            </span>
          </div>
          <div className="flex items-center space-x-1">{renderActionButtons(comment)}</div>
        </div>
      ))}
    </>
  )
}
