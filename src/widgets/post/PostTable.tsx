import { ThumbsDown, ThumbsUp } from "lucide-react"

import { PostDeleteButton } from "@features/post-delete"
import { usePostDetailModal } from "@features/post-detail"
import { usePostEditModal } from "@features/post-edit"
import { usePostFiltersParams } from "@features/posts-view/model/usePostFilterParams"
import { usePostsWithAuthorQuery } from "@/features/posts-view/model/usePostsWithAuthorQuery"
import { HighlightedText } from "@features/posts-view/ui/HighlightedText"
import { PostTag } from "@features/posts-view/ui/PostTag"
import { useUserDetailModal } from "@features/user-view/model/useUserDetailModal"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui"

export function PostTable() {
  const { data: posts, isLoading } = usePostsWithAuthorQuery()
  const { searchQuery, selectedTag } = usePostFiltersParams()

  const { UserDetailModal, UserPreview } = useUserDetailModal()
  const { PostDetailModal, PostDetailOpenButton } = usePostDetailModal()
  const { PostEditModal, PostEditButton } = usePostEditModal()

  if (isLoading || !posts) {
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
