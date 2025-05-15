

import { LeadTable } from "@/components/lead-table";
import { getLeads } from "@/lib/actions";

export default async function AdminPage() {

  const leads = await getLeads()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside
          className="w-64 border-r"
          style={{
            background: "linear-gradient(to bottom, rgb(217, 222, 165), white)",
          }}
        >
          <div className="pl-3 container flex h-16 items-center lg:px-8">
            <p className="text-3xl">Alma</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Leads
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Settings
                </a>
              </li>
              <li>
                <div className="bottom-4 left-4 pt-10">
                  <a
                    href="/"
                    className="w-full rounded-md py-2 text-sm font-medium"
                  >
                    Sign Out
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1">
          <div className="container py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Leads</h1>
            </div>

            <LeadTable initialLeads={leads} />
          </div>
        </main>
      </div>
    </div>
  )
}
