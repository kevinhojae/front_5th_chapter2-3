import { BrowserRouter as Router } from "react-router-dom"
import Header from "../widgets/ui/Header.tsx"
import Footer from "../widgets/ui/Footer.tsx"
import PostsManagerPage from "../pages/PostsManagerPage.tsx"
import { PostProvider } from "../features/posts-view/model/PostContext.tsx"
import { PaginationProvider } from "../features/posts-view/model/PaginationContext.tsx"
import { PostFilterProvider } from "../features/posts-view/model/PostFilterContext.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient.ts"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <QueryClientProvider client={queryClient}>
            <PaginationProvider>
              <PostFilterProvider>
                <PostProvider>
                  <PostsManagerPage />
                </PostProvider>
              </PostFilterProvider>
            </PaginationProvider>
          </QueryClientProvider>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
