import { usePostFiltersParams } from "./usePostFilterParams"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  query: z.string(),
})

export const usePostSearchInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  })

  const { setSearchQuery } = usePostFiltersParams()

  const handlePostSearch = async ({ query }: z.infer<typeof formSchema>) => {
    // setLoading(true)

    // try {
    //   const { posts, total } = query ? await fetchPostsBySearchQuery(query) : await fetchPostsWithAuthor(limit, skip)

    //   setPosts(posts)
    //   setTotal(total)

    //   setSearchQuery(query)
    // } catch (error) {
    //   console.error("게시물 검색 오류:", error)
    // } finally {
    //   setLoading(false)
    // }
    setSearchQuery(query)
  }

  return { form, handlePostSearch }
}
