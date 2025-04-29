import { createContext, useContext, useEffect, useState } from "react"
import { PostWithAuthor } from "./post-with-author"
import { usePagination } from "./PaginationProvider"
import { fetchPostsWithAuthor } from "../api/fetchPostsWithAuthor"
import { fetchPostsWithAuthorByTag } from "../api/fetchPostsWithAuthorByTag"
import { fetchTags } from "../../../entities/post/api/fetchTags"
import { usePostFilters } from "./FilterProvider"

type PostContextType = {
  posts: PostWithAuthor[]
  setPosts: (posts: PostWithAuthor[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  tags: { url: string; slug: string; name: string }[]
  setTags: (tags: { url: string; slug: string; name: string }[]) => void
  getPostsOfSelectedTag: (tag: string) => Promise<void>
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {},
  loading: false,
  setLoading: () => {},
  tags: [],
  setTags: () => {},
  getPostsOfSelectedTag: () => Promise.resolve(),
})

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [tags, setTags] = useState<{ url: string; slug: string; name: string }[]>([])

  const [loading, setLoading] = useState(false)

  const { limit, skip, setTotal } = usePagination()
  const { sortBy, sortOrder, selectedTag } = usePostFilters()

  const getPostsOfSelectedTag = async (tag: string) => {
    setLoading(true)

    try {
      const { posts, total } =
        !tag || tag === "all" ? await fetchPostsWithAuthor(limit, skip) : await fetchPostsWithAuthorByTag(tag)

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTags = async () => {
    try {
      const data = await fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  const getPosts = async () => {
    setLoading(true)

    try {
      const { posts, total } = await fetchPostsWithAuthor(limit, skip)

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      getPostsOfSelectedTag(selectedTag)
    } else {
      getPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    tags,
    setTags,
    getPostsOfSelectedTag,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export const usePosts = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePost must be used within a PostProvider")
  }

  return context
}
