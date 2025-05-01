import { PropsWithChildren } from "react"

import { Footer } from "./Footer"
import { Header } from "./Header"

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
