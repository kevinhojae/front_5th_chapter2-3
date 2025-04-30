import { useCallback, useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { HighlightedText } from "../../posts-view/ui/HighlightedText"
import { Post } from "../../../entities/post/model/post"
import { usePostFilters } from "../../posts-view/model/PostFilterContext"
import { CommentContainer } from "../ui/CommentContainer"

export const usePostDetailModal = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailModal, setShowPostDetailModal] = useState(false)

  const { searchQuery } = usePostFilters()

  const openPostDetail = useCallback(async (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailModal(true)
  }, [])

  const PostDetailOpenButton = useCallback(
    (props: { post: Post }) => (
      <Button variant="ghost" size="sm" onClick={() => openPostDetail(props.post)}>
        <MessageSquare className="w-4 h-4" />
      </Button>
    ),
    [openPostDetail],
  )

  const PostDetailModalCallback = useCallback(
    () => (
      <Dialog open={showPostDetailModal} onOpenChange={setShowPostDetailModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <HighlightedText text={selectedPost?.title || ""} highlight={searchQuery} />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <HighlightedText text={selectedPost?.body || ""} highlight={searchQuery} />
            </p>
            {selectedPost && <CommentContainer postId={selectedPost.id} />}
          </div>
        </DialogContent>
      </Dialog>
    ),
    [showPostDetailModal, selectedPost, searchQuery],
  )

  return {
    showPostDetailModal,
    setShowPostDetailModal,
    PostDetailOpenButton,
    PostDetailModal: PostDetailModalCallback,
    selectedPost,
  }
}
