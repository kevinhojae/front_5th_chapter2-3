import { createContext, useContext, useEffect, useState } from "react"
import { PostWithAuthor } from "../model/post-with-author"
import { usePagination } from "./usePagination"
import { usePostSearch } from "./usePostSearch"
import { getPostsWithAuthor } from "../api/get-posts-with-author"
import { getSearchedPosts } from "../api/get-searched-posts"
import { usePostFilters } from "./usePostFilters"
import { getPostsWithAuthorByTag } from "../api/get-posts-with-author-by-tag"
import { getTags } from "../../../entities/post/api/get-tags"
import { useNavigate } from "react-router-dom"

type PostContextType = {
  posts: PostWithAuthor[]
  setPosts: (posts: PostWithAuthor[]) => void
  total: number
  setTotal: (total: number) => void
  limit: number
  setLimit: (limit: number) => void
  skip: number
  setSkip: (skip: number) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  tags: { url: string; slug: string; name: string }[]
  setTags: (tags: { url: string; slug: string; name: string }[]) => void
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
  updateURL: () => void
  fetchPostsByTag: (tag: string) => Promise<void>
  fetchPostsBySearch: () => Promise<void>
  highlightText: (text: string, highlight: string) => React.ReactNode
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  total: 0,
  setPosts: () => {},
  setTotal: () => {},
  limit: 10,
  skip: 0,
  setLimit: () => {},
  setSkip: () => {},
  loading: false,
  setLoading: () => {},
  tags: [],
  setTags: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  sortBy: "",
  setSortBy: () => {},
  sortOrder: "",
  setSortOrder: () => {},
  selectedTag: "",
  setSelectedTag: () => {},
  updateURL: () => {},
  fetchPostsBySearch: () => Promise.resolve(),
  fetchPostsByTag: () => Promise.resolve(),
  highlightText: () => null,
})

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [tags, setTags] = useState<{ url: string; slug: string; name: string }[]>([])

  const [loading, setLoading] = useState(false)

  const { limit, skip, total, setLimit, setSkip, setTotal } = usePagination()
  const { searchQuery, setSearchQuery } = usePostSearch()
  const { sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag } = usePostFilters()

  const navigate = useNavigate()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  const fetchPostsBySearch = async () => {
    setLoading(true)

    try {
      const { posts, total } = searchQuery ? await getSearchedPosts(searchQuery) : await getPostsWithAuthor(limit, skip)

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPostsByTag = async (tag: string) => {
    setLoading(true)

    try {
      const { posts, total } =
        !tag || tag === "all" ? await getPostsWithAuthor(limit, skip) : await getPostsWithAuthorByTag(tag)

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const data = await getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  const fetchPosts = async () => {
    setLoading(true)

    try {
      const { posts, total } = await getPostsWithAuthor(limit, skip)

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  const value = {
    posts,
    total,
    setPosts,
    setTotal,
    limit,
    skip,
    setLimit,
    setSkip,
    loading,
    setLoading,
    tags,
    setTags,
    highlightText,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    updateURL,
    fetchPostsBySearch,
    fetchPostsByTag,
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
