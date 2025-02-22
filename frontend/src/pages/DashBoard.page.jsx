"use client"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import {
  Bell,
  Moon,
  Menu,
  X,
  Home,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  Video,
  Settings,
  HelpCircle,
} from "lucide-react"
import AuthPage from "./Authentication.page"
import { toast } from "react-toastify"
import { Avatar } from "@/components/ui/avatar"
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navLinks = [
    { title: "Book Facilities", icon: Home, path: "/dashboard" },
    { title: "Notify Parents", icon: CreditCard, path: "/dashboard/healthAndLeaveNotify" },
    { title: "Election", icon:Users , path: "/dashboard/elections" },
    { title: "Academic Integrity", icon:Users , path: "/dashboard/CheatingRecords" },
    { title: "Complaints", icon: MessageSquare, path: "/dashboard/complaints" }, 
    { title: "Applications & Approvals", icon: Video, path: "/dashboard/applicationapproval" },
    { title: "Budget & Sponsorships", icon: Settings, path: "/dashboard/budgetSponsorshipTracking" },
    { title: "Help", icon: HelpCircle, path: "/dashboard/help" },
  ]

  return (
    <div className="min-h-screen bg-background ">
      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur bg-black supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium md:hidden"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <span className="font-semibold">Neo Fixers</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-slate-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-accent " onClick={() => {
              localStorage.removeItem("accessToken")
              localStorage.removeItem("refreshToken")
              localStorage.removeItem("name")
              localStorage.removeItem("email")
              localStorage.removeItem("id")
              toast.success("Logged out successfully")

              window.location.href = "/"
            }}>
              <Avatar className="h-5 w-5 "  />
              <span className="hidden md:block text-sm font-medium">{localStorage.getItem("name")}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r bg-background pt-14 transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="overflow-y-auto">
          <nav className="space-y-6 p-4">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Icon className="h-5 w-5" />
                  {link.title}
                </a>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-3.5rem)] pt-14 md:ml-64">
        <div className="p-4">
          {/* {children} */}
          <Outlet />{" "}
        </div>
      </main>
    </div>
  )
}
