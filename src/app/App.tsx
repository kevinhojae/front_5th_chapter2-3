import { BrowserRouter as Router } from "react-router-dom"
import { PostsDashboardPage } from "../pages"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient.ts"

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <PostsDashboardPage />
      </QueryClientProvider>
    </Router>
  )
}

export default App
