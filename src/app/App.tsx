import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { PostsDashboardPage } from "@pages/PostsDashboardPage"

import { queryClient } from "./lib/queryClient.ts"

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <PostsDashboardPage />
      </QueryClientProvider>
      <ToastContainer />
    </Router>
  )
}

export default App
