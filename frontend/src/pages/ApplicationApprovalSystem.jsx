"use client"

import { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { Bell, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ApplicationDetail({ application }) {
  const totalStages = application.type === "event" ? 3 : 4
  const approvedStages = application.approvalStages.filter((stage) => stage.status === "approved").length
  const progress = (approvedStages / totalStages) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{application.title}</h2>
          <div className="text-sm text-muted-foreground">
            Submitted by {application.submittedBy.name} ({application.submittedBy.email})
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={application.priority === "high" ? "destructive" : "secondary"}>{application.priority}</Badge>
          <Badge
            variant={
              application.status === "approved"
                ? "success"
                : application.status === "rejected"
                  ? "destructive"
                  : "secondary"
            }
          >
            {application.status}
          </Badge>
        </div>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Application Type</div>
            <div>{application.type}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Submitted On</div>
            <div>{new Date(application.submittedAt).toLocaleString()}</div>
          </div>
          {application.amount && application.amount > 0 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground">Amount</div>
              <div>${application.amount.toLocaleString()}</div>
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Description</div>
          <div className="mt-1">{application.description}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Approval Stages</h3>
        <div className="space-y-4">
          {application.approvalStages.map((stage, index) => (
            <div key={index} className="relative pl-8">
              <div
                className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 ${
                  stage.status === "approved"
                    ? "bg-green-500 border-green-500"
                    : stage.status === "rejected"
                      ? "bg-destructive border-destructive"
                      : "border-muted-foreground"
                }`}
              />
              {index < application.approvalStages.length - 1 && (
                <div
                  className={`absolute left-2 top-6 h-full w-0.5 -ml-px ${
                    stage.status === "approved" ? "bg-green-500" : "bg-muted"
                  }`}
                />
              )}
              <div className="pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{stage.role}</div>
                    <div className="text-sm text-muted-foreground">
                      {stage.name} ({stage.email})
                    </div>
                  </div>
                  {stage.timestamp && (
                    <div
                      className={`text-sm ${
                        stage.status === "approved"
                          ? "text-green-500"
                          : stage.status === "rejected"
                            ? "text-destructive"
                            : ""
                      }`}
                    >
                      {new Date(stage.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ApplicationDetail.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    submittedBy: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    submittedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    approvalStages: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        timestamp: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

function ApplicationCard({ application }) {
  const totalStages = application.type === "event" ? 3 : 4
  const approvedStages = application.approvalStages.filter((stage) => stage.status === "approved").length
  const progress = (approvedStages / totalStages) * 100

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{application.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={application.priority === "high" ? "destructive" : "secondary"}>
                {application.priority}
              </Badge>
              <Badge
                variant={
                  application.status === "approved"
                    ? "success"
                    : application.status === "rejected"
                      ? "destructive"
                      : "secondary"
                }
              >
                {application.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{application.description}</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Type: {application.type}</div>
            <div className="text-sm text-muted-foreground">
              Submitted: {new Date(application.submittedAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <ApplicationDetail application={application} />
      </DialogContent>
    </Dialog>
  )
}

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    submittedBy: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    submittedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    approvalStages: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        timestamp: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

function NewApplicationForm() {
  const [applicationType, setApplicationType] = useState("")

  const approvalStages = {
    event: ["Student Coordinator", "Faculty Coordinator", "Dean"],
    budget: ["Student Coordinator", "Faculty Coordinator", "Dean", "Director"],
    sponsorship: ["Student Coordinator", "Faculty Coordinator", "Dean"],
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="type">Application Type</Label>
        <Select onValueChange={setApplicationType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="event">Event Organization</SelectItem>
            <SelectItem value="budget">Budget Approval</SelectItem>
            <SelectItem value="sponsorship">Sponsorship</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter title" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Enter description" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount (if applicable)</Label>
        <Input id="amount" type="number" placeholder="Enter amount" />
      </div>

      {applicationType && (
        <div className="space-y-4">
          <h3 className="font-medium">Approval Stages</h3>
          {approvalStages[applicationType].map((stage, index) => (
            <div key={index} className="grid gap-2">
              <Label>{stage} Email</Label>
              <Input type="email" placeholder={`Enter ${stage.toLowerCase()} email`} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

NewApplicationForm.propTypes = {
  // This component doesn't receive any props directly
};

const sampleApplications = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    type: "event",
    status: "pending",
    priority: "high",
    submittedBy: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    submittedAt: "2024-02-21T10:30:00",
    description: "Request for organizing the annual technology festival with workshops and competitions.",
    amount: 5000,
    approvalStages: [
      {
        role: "Student Coordinator",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        status: "approved",
        timestamp: "2024-02-21T11:30:00",
      },
      {
        role: "Faculty Coordinator",
        name: "Dr. Michael Smith",
        email: "m.smith@example.com",
        status: "approved",
        timestamp: "2024-02-21T14:15:00",
      },
      {
        role: "Dean",
        name: "Dr. Emily Brown",
        email: "e.brown@example.com",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    title: "Research Project Funding",
    type: "budget",
    status: "approved",
    priority: "medium",
    submittedBy: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    submittedAt: "2024-02-20T15:45:00",
    description: "Budget request for the upcoming research project on renewable energy.",
    amount: 15000,
    approvalStages: [
      {
        role: "Student Coordinator",
        name: "Mark Wilson",
        email: "mark.w@example.com",
        status: "approved",
        timestamp: "2024-02-20T16:30:00",
      },
      {
        role: "Faculty Coordinator",
        name: "Dr. Lisa Anderson",
        email: "l.anderson@example.com",
        status: "approved",
        timestamp: "2024-02-21T09:20:00",
      },
      {
        role: "Dean",
        name: "Dr. Robert Taylor",
        email: "r.taylor@example.com",
        status: "approved",
        timestamp: "2024-02-22T11:45:00",
      },
      {
        role: "Director",
        name: "Dr. James Wilson",
        email: "j.wilson@example.com",
        status: "approved",
        timestamp: "2024-02-23T14:30:00",
      },
    ],
  },
  {
    id: 3,
    title: "Sports Equipment Purchase",
    type: "budget",
    status: "rejected",
    priority: "low",
    submittedBy: {
      name: "Alex Johnson",
      email: "alex.j@example.com",
    },
    submittedAt: "2024-02-19T09:00:00",
    description: "Request for purchasing new sports equipment for the university gym.",
    amount: 3000,
    approvalStages: [
      {
        role: "Student Coordinator",
        name: "Chris Lee",
        email: "chris.l@example.com",
        status: "approved",
        timestamp: "2024-02-19T10:30:00",
      },
      {
        role: "Faculty Coordinator",
        name: "Dr. Sarah Brown",
        email: "s.brown@example.com",
        status: "approved",
        timestamp: "2024-02-20T11:15:00",
      },
      {
        role: "Dean",
        name: "Dr. David Clark",
        email: "d.clark@example.com",
        status: "rejected",
        timestamp: "2024-02-21T14:00:00",
      },
      {
        role: "Director",
        name: "Dr. Patricia White",
        email: "p.white@example.com",
        status: "pending",
      },
    ],
  },
  {
    id: 4,
    title: "Campus Art Exhibition",
    type: "sponsorship",
    status: "pending",
    priority: "medium",
    submittedBy: {
      name: "Emma Watson",
      email: "emma.w@example.com",
    },
    submittedAt: "2024-02-18T13:20:00",
    description: "Seeking sponsorship for a campus-wide art exhibition featuring student works.",
    amount: 2000,
    approvalStages: [
      {
        role: "Student Coordinator",
        name: "Tom Harris",
        email: "tom.h@example.com",
        status: "approved",
        timestamp: "2024-02-18T14:30:00",
      },
      {
        role: "Faculty Coordinator",
        name: "Dr. Alice Green",
        email: "a.green@example.com",
        status: "approved",
        timestamp: "2024-02-19T10:00:00",
      },
      {
        role: "Dean",
        name: "Dr. Robert Johnson",
        email: "r.johnson@example.com",
        status: "pending",
      },
    ],
  },
]

export default function ApplicationPortal() {
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredApplications = useMemo(() => {
    const sortedApps = sampleApplications
      .filter((app) => filterType === "all" || app.type === filterType)
      .filter((app) => filterStatus === "all" || app.status === filterStatus)
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))

    return sortedApps.map((app, index) => ({
      ...app,
      priority: index === 0 ? "high" : index === sortedApps.length - 1 ? "low" : "medium",
    }))
  }, [filterType, filterStatus])

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center px-4">
            <h1 className="text-2xl font-semibold">Application Portal</h1>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container px-4 py-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select defaultValue="all" onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="event">Event Organization</SelectItem>
                      <SelectItem value="budget">Budget Approval</SelectItem>
                      <SelectItem value="sponsorship">Sponsorship</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Submit New Application</DialogTitle>
                      <DialogDescription>Fill in the details for your application request</DialogDescription>
                    </DialogHeader>
                    <NewApplicationForm />
                    <DialogFooter>
                      <Button type="submit">Submit Application</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Tabs defaultValue="all" onValueChange={setFilterStatus}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ScrollArea className="h-[calc(100vh-220px)]">
                    <div className="grid gap-4">
                      {filteredApplications.map((application) => (
                        <ApplicationCard key={application.id} application={application} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

ApplicationPortal.propTypes = {
  // This component doesn't receive any props directly
};

