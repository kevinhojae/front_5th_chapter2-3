import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostTag } from "./PostTag"
import { HighlightedText } from "./HighlightedText"
import { useUserDetailModal } from "../../user-view/model/useUserDetailModal"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { usePostEditModal } from "../../post-edit"
import { usePostDetailModal } from "../../post-detail"
import { PostDeleteButton } from "../../post-delete"
import { usePostFilters } from "../model/PostFilterContext"
import { usePosts } from "../model/PostContext"

export function PostTable() {
  const { posts, loading } = usePosts()
  const { searchQuery, selectedTag } = usePostFilters()

  const { UserDetailModal, UserPreview } = useUserDetailModal()
  const { PostDetailModal, PostDetailOpenButton } = usePostDetailModal()
  const { PostEditModal, PostEditButton } = usePostEditModal()

  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>
                    <HighlightedText text={post.title} highlight={searchQuery} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => <PostTag key={tag} tag={tag} selectedTag={selectedTag} />)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <UserPreview user={post.author} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.reactions?.likes || 0}</span>
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.reactions?.dislikes || 0}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <PostDetailOpenButton post={post} />
                  <PostEditButton post={post} />
                  <PostDeleteButton post={post} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserDetailModal />
      <PostDetailModal />
      <PostEditModal />
    </>
  )
}
