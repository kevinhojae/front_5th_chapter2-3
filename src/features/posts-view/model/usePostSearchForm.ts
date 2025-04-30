import { usePostFiltersParams } from "./usePostFilterParams"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  query: z.string(),
})

export const usePostSearchForm = () => {
  const { searchQuery, setSearchQuery } = usePostFiltersParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchQuery,
    },
  })

  const handlePostSearch = async ({ query }: z.infer<typeof formSchema>) => {
    setSearchQuery(query)
  }

  return { form, handlePostSearch }
}
