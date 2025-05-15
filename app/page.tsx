import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8" style={{ background: "rgb(217, 222, 165)" }}>
          <div className="font-semibold text-lg">Lead Management</div>
          <div className="ml-auto">
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Submit Your Information</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We're excited to learn more about you. Fill out the form below to get started.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/submit">
                  <Button className="w-full">
                    Go to Form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alma Lead Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
