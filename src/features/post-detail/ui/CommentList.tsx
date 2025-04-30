import { Comment } from "../../../entities/comment/model/comment"
import { usePostFilters } from "../../posts-view/model/PostFilterContext"
import { HighlightedText } from "../../posts-view/ui/HighlightedText"

export function CommentList({
  comments,
  renderActionButtons,
}: {
  comments: Comment[]
  renderActionButtons: (comment: Comment) => React.ReactNode
}) {
  const { searchQuery } = usePostFilters()

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
