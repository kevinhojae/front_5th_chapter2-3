import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { PostProvider } from "./features/post-view/lib/PostProvider.tsx"
import { PaginationProvider } from "./features/post-view/lib/PaginationProvider.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PaginationProvider>
            <PostProvider>
              <PostsManagerPage />
            </PostProvider>
          </PaginationProvider>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
