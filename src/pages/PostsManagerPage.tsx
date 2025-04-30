import { TablePaginator } from "../features/posts-view/ui/TablePaginator"
import { PostSearchInput } from "../features/posts-view/ui/PostSearchInput"
import { PostTagSelector } from "../features/posts-view/ui/PostTagSelector"
import { PostSortController } from "../features/posts-view/ui/PostSortController"
import { PostTable } from "../features/posts-view/ui/PostTable"
import { usePostAddModal } from "../features/post-add"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

const PostsManager = () => {
  const { PostAddModal, PostAddButton } = usePostAddModal()

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
            <PostSearchInput />
            <PostTagSelector />
            <PostSortController />
          </div>

          {/* 게시물 테이블 */}
          <PostTable />

          <TablePaginator />
        </div>
      </CardContent>

      {/* 게시물 추가 모달 */}
      <PostAddModal />
    </Card>
  )
}

export default PostsManager
