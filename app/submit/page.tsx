import { LeadForm } from "@/components/lead-form"

export default function SubmitPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div
          className="flex h-56 items-center px-4 sm:px-6 lg:px-8"
          style={{ background: "rgb(217, 222, 165)" }}
        >
          <div className="flex flex-col align-center justify-center pl-10">
            <div className="font-bold text-3xl font-size mb-4">alma</div>
            <div className="font-bold text-4xl">
              Get An Assessment<br />Of Your Immigration Case
            </div>
          </div>

        </div>
      </header>
      <main className="flex justify-center">
        <div className="max-w-lg py-10 px-4 sm:px-6 lg:px-8">
          <LeadForm />
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lead Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
