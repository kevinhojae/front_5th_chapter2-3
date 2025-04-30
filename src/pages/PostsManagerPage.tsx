import { useState } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/ui"
import { User } from "../entities/user/model/user"
import { UserDetail } from "../entities/user/model/userDetail"
import { usePosts } from "../features/post-view/model/PostContext"
import { TablePaginator } from "../features/post-view/ui/TablePaginator"
import { PostSearchInput } from "../features/post-view/ui/PostSearchInput"
import { usePostFilters } from "../features/post-view/model/PostFilterContext"
import { PostTagSelector } from "../features/post-view/ui/PostTagSelector"
import { PostTag } from "../features/post-view/ui/PostTag"
import { PostSortController } from "../features/post-view/ui/PostSortController"
import { HighlightedText } from "../features/post-view/ui/HighlightedText"
import { usePostAddModal } from "../features/post-add"
import { usePostEditModal } from "../features/post-edit"
import { PostDeleteButton } from "../features/post-delete"
import { usePostDetailModal } from "../features/post-detail/model/usePostDetailModal"

const PostsManager = () => {
  const { PostDetailModal, PostDetailOpenButton } = usePostDetailModal()

  // user (사용자) 관련 상태
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const { posts, loading } = usePosts()
  const { searchQuery, selectedTag } = usePostFilters()

  const { PostAddModal, PostAddButton } = usePostAddModal()
  const { PostEditModal, PostEditButton } = usePostEditModal()

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
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
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
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
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <PostSearchInput />
            </div>
            <PostTagSelector />
            <PostSortController />
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          <TablePaginator />
        </div>
      </CardContent>

      {/* 게시물 추가 모달 */}
      <PostAddModal />

      {/* 게시물 수정 모달 */}
      <PostEditModal />

      {/* 게시물 상세 보기 모달 */}
      <PostDetailModal />

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
