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
    setSearchQuery(query)
  }

  return { form, handlePostSearch }
}
