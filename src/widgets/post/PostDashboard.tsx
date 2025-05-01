import { TablePaginator } from "@widgets/layout"

import { usePostAddModal } from "@features/post-add"
import { PostSearchForm } from "@features/posts-view/ui/PostSearchForm"
import { PostSortBy } from "@features/posts-view/ui/PostSortBy"
import { PostSortOrder } from "@features/posts-view/ui/PostSortOrder"
import { PostTagSelector } from "@features/posts-view/ui/PostTagSelector"

import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui"

import { PostTable } from "./PostTable"

export function PostsDashboard() {
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
            <PostSearchForm />
            <PostTagSelector />
            <PostSortOrder />
            <PostSortBy />
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
