"use client"
import { Outlet, useLocation } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileNav from "@/components/ProfileNav"
import { useState } from "react"
import {
  Bell,
  Menu,
  X,
  Home,
  Users,
  CreditCard,
  MessageSquare,
  Video,
  Settings,
  HelpCircle,
  FileText,
  Calendar,
  Activity,
  DollarSign,
  CheckCircle,
  Clock,
  Bookmark,
  AlertTriangle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dashboard dummy data
const dashboardData = {
  stats: {
    totalApplications: 87,
    pendingApprovals: 42,
    upcomingEvents: 5,
    activeElections: 2,
    complaintsThisMonth: 23,
    budgetUtilization: 72,
    totalStudents: 4250,
    facultyMembers: 186,
  },

  recentApplications: [
    {
      id: "app-1",
      title: "Campus Tech Fest 2025",
      type: "Event",
      status: "Pending",
      submittedBy: "Aditya Sharma",
      submittedAt: "2025-05-20T10:30:00Z",
    },
    {
      id: "app-2",
      title: "Cultural Night Budget",
      type: "Budget",
      status: "Approved",
      submittedBy: "Priya Patel",
      submittedAt: "2025-05-19T15:45:00Z",
    },
    {
      id: "app-3",
      title: "Sports Equipment Purchase",
      type: "Budget",
      status: "Rejected",
      submittedBy: "Rahul Verma",
      submittedAt: "2025-05-18T09:15:00Z",
    },
  ],

  upcomingEvents: [
    {
      id: "evt-1",
      title: "Annual Tech Symposium",
      date: "2025-05-25T09:00:00Z",
      location: "Main Auditorium",
      organizer: "Computer Science Dept.",
    },
    {
      id: "evt-2",
      title: "Sustainability Workshop",
      date: "2025-05-27T14:00:00Z",
      location: "Seminar Hall B",
      organizer: "Environmental Club",
    },
    {
      id: "evt-3",
      title: "Cultural Festival",
      date: "2025-06-01T11:00:00Z",
      location: "College Grounds",
      organizer: "Cultural Committee",
    },
  ],

  recentComplaints: [
    {
      id: "comp-1",
      title: "Poor Internet Connectivity in Hostel Block C",
      category: "Facility",
      status: "Open",
      raisedBy: "Anonymous",
      date: "2025-05-20T08:45:00Z",
      upvotes: 7,
    },
    {
      id: "comp-2",
      title: "Cafeteria Food Quality Issues",
      category: "Student Life",
      status: "In Progress",
      raisedBy: "Anonymous",
      date: "2025-05-15T09:20:00Z",
      upvotes: 11,
    },
    {
      id: "comp-3",
      title: "Library Noise Level During Exam Week",
      category: "Academic",
      status: "Resolved",
      raisedBy: "Samir Khan",
      date: "2025-05-12T14:30:00Z",
      upvotes: 15,
    },
    {
      id: "comp-4",
      title: "Broken Air Conditioning in CS Department",
      category: "Facility",
      status: "In Progress",
      raisedBy: "Anita Desai",
      date: "2025-05-17T11:25:00Z",
      upvotes: 9,
    },
    {
      id: "comp-5",
      title: "Parking Space Shortage for Students",
      category: "Infrastructure",
      status: "Open",
      raisedBy: "Vikram Mehta",
      date: "2025-05-19T16:05:00Z",
      upvotes: 23,
    },
    {
      id: "comp-6",
      title: "Outdated Laboratory Equipment in Physics Lab",
      category: "Academic",
      status: "Open",
      raisedBy: "Shreya Gupta",
      date: "2025-05-21T09:15:00Z",
      upvotes: 8,
    },
  ],

  activeElections: [
    {
      id: "elec-1",
      title: "Student Council Election 2025",
      startDate: "2025-05-20T00:00:00Z",
      endDate: "2025-05-25T23:59:59Z",
      positions: [
        "President",
        "Vice President",
        "General Secretary",
        "Treasurer",
      ],
      totalVoters: 4250,
      votesRecorded: 1876,
    },
    {
      id: "elec-2",
      title: "Department Representatives Election",
      startDate: "2025-05-22T00:00:00Z",
      endDate: "2025-05-24T23:59:59Z",
      positions: ["CS Rep", "ME Rep", "EE Rep", "CE Rep", "CH Rep"],
      totalVoters: 4250,
      votesRecorded: 952,
    },
  ],

  healthNotifications: [
    {
      id: "hlth-1",
      studentName: "Amit Singh",
      reason: "Reported Sick",
      status: "Approved",
      date: "2025-05-20T08:10:00Z",
    },
    {
      id: "hlth-2",
      studentName: "Neha Patel",
      reason: "Left Campus",
      status: "Pending",
      date: "2025-05-18T14:15:00Z",
    },
  ],

  cheatingRecords: [
    {
      id: "rec-1",
      studentName: "Anonymous",
      subject: "Data Structures and Algorithms",
      date: "2025-05-10T09:30:00Z",
    },
    {
      id: "rec-2",
      studentName: "Anonymous",
      subject: "Digital Electronics",
      date: "2025-05-12T14:15:00Z",
    },
  ],

  budgetOverview: {
    total: 1500000,
    spent: 1080000,
    remaining: 420000,
    categories: [
      { name: "Academic", allocated: 600000, spent: 450000 },
      { name: "Events", allocated: 300000, spent: 225000 },
      { name: "Infrastructure", allocated: 400000, spent: 300000 },
      { name: "Sports", allocated: 150000, spent: 75000 },
      { name: "Miscellaneous", allocated: 50000, spent: 30000 },
    ],
  },
}

const defaultProfile = {
  name: "Eugene An",
  role: "Prompt Engineer",
  avatar:
    "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
  subscription: "Free Trial",
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: May 22, 2025, 10:30 AM
          </span>
          <Button variant="outline" size="sm">
            <span className="sr-only">Refresh</span>
            <Activity className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.totalApplications}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.stats.pendingApprovals} pending approvals
            </p>
            <Progress
              className="mt-2"
              value={
                (dashboardData.stats.pendingApprovals /
                  dashboardData.stats.totalApplications) *
                100
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.upcomingEvents}
            </div>
            <p className="text-xs text-muted-foreground">
              Next:{" "}
              {new Date(dashboardData.upcomingEvents[0].date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.activeElections}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.activeElections[0].votesRecorded} votes recorded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.budgetUtilization}%
            </div>
            <p className="text-xs text-muted-foreground">
              $
              {(
                dashboardData.budgetOverview.spent /
                1000
              ).toFixed(1)}
              k / $
              {(
                dashboardData.budgetOverview.total /
                1000
              ).toFixed(1)}
              k
            </p>
            <Progress
              className="mt-2"
              value={dashboardData.stats.budgetUtilization}
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="elections">Elections</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {dashboardData.recentApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{app.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{app.type}</Badge>
                        <Badge
                          variant={
                            app.status === "Approved"
                              ? "success"
                              : app.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Submitted by: {app.submittedBy}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </div>

          <div className="space-y-4">
            {dashboardData.upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {new Date(event.date).toLocaleString(undefined, {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <Badge variant="outline">{event.location}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Organized by: {event.organizer}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Complaints</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {dashboardData.recentComplaints.map((complaint) => (
              <Card key={complaint.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{complaint.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{complaint.category}</Badge>
                        <Badge
                          variant={
                            complaint.status === "Resolved"
                              ? "success"
                              : complaint.status === "Open"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Bookmark className="h-4 w-4 mr-1" />
                      {complaint.upvotes}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground flex justify-between">
                    <span>Raised by: {complaint.raisedBy}</span>
                    <span>{new Date(complaint.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="elections" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Elections</h2>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>

          <div className="space-y-4">
            {dashboardData.activeElections.map((election) => (
              <Card key={election.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{election.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {new Date(election.startDate).toLocaleDateString()} -{" "}
                        {new Date(election.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm">
                      <Badge variant="outline">
                        {election.positions.length} Positions
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>
                        Votes: {election.votesRecorded} / {election.totalVoters}
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round(
                          (election.votesRecorded / election.totalVoters) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(election.votesRecorded / election.totalVoters) * 100}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Row - Other Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Health & Leave Notifications</CardTitle>
            <CardDescription>Recent health and leave reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.healthNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {notification.status === "Approved" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{notification.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      {notification.reason} - {notification.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(notification.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Integrity</CardTitle>
            <CardDescription>Recent cheating records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.cheatingRecords.map((record) => (
                <div key={record.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-medium">{record.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      Subject: {record.subject}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(record.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Current budget utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Total Budget</div>
                <div className="text-2xl font-bold">
                  ${dashboardData.budgetOverview.total.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Remaining</div>
                <div className="text-2xl font-bold">
                  ${dashboardData.budgetOverview.remaining.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {dashboardData.budgetOverview.categories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span className="text-muted-foreground">
                      {Math.round((category.spent / category.allocated) * 100)}%
                    </span>
                  </div>
                  <Progress value={(category.spent / category.allocated) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

DashboardOverview.propTypes = {
  // This component doesn't receive any props
};

export default function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  const navLinks = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Book Facilities", icon: Home, path: "/bookingfacility" },
    {
      title: "Notify Parents",
      icon: CreditCard,
      path: "/healthAndLeaveNotify",
    },
    { title: "Election", icon: Users, path: "/elections" },
    {
      title: "Academic Integrity",
      icon: Users,
      path: "/CheatingRecords",
    },
    { title: "Complaints", icon: MessageSquare, path: "/complaints" },
    {
      title: "Applications & Approvals",
      icon: Video,
      path: "/applicationapproval",
    },
    {
      title: "Budget & Sponsorships",
      icon: Settings,
      path: "/budgetSponsorshipTracking",
    },
    { title: "Help", icon: HelpCircle, path: "/help" },
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
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <img
                  src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                  alt="User avatar"
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
              >
                <ProfileNav userProfile={defaultProfile} />
              </DropdownMenuContent>
            </DropdownMenu>
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
          {isHomePage ? <DashboardOverview /> : <Outlet />}
        </div>
      </main>
    </div>
  )
}

DashBoard.propTypes = {
  // This component doesn't receive any props directly
};
