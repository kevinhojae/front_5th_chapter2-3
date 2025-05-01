import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { usePostFiltersParams } from "./usePostFilterParams"

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
