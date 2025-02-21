"use client"

import * as React from "react"
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
import { cn } from "@/lib/utils"

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
            <div>{application.type === "event" ? "Event Organization" : "Budget Approval"}</div>
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
                className={cn(
                  "absolute left-0 top-2 h-4 w-4 rounded-full border-2",
                  stage.status === "approved" && "bg-green-500 border-green-500",
                  stage.status === "rejected" && "bg-destructive border-destructive",
                  stage.status === "pending" && "border-muted-foreground",
                )}
              />
              {index < application.approvalStages.length - 1 && (
                <div
                  className={cn(
                    "absolute left-2 top-6 h-full w-0.5 -ml-px",
                    stage.status === "approved" ? "bg-green-500" : "bg-muted",
                  )}
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
                      className={cn(
                        "text-sm",
                        stage.status === "approved" && "text-green-500",
                        stage.status === "rejected" && "text-destructive",
                      )}
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

function ApplicationCard({
  id,
  title,
  type,
  status,
  priority,
  submittedAt,
  description,
  approvalStages,
  application,
}) {
  const totalStages = type === "event" ? 3 : 4
  const approvedStages = approvalStages.filter((stage) => stage.status === "approved").length
  const progress = (approvedStages / totalStages) * 100

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={priority === "high" ? "destructive" : "secondary"}>{priority}</Badge>
              <Badge variant={status === "approved" ? "success" : status === "rejected" ? "destructive" : "secondary"}>
                {status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{description}</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Type: {type}</div>
            <div className="text-sm text-muted-foreground">Submitted: {submittedAt}</div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <ApplicationDetail application={application} />
      </DialogContent>
    </Dialog>
  )
}

function NewApplicationForm() {
  const [applicationType, setApplicationType] = React.useState()

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="type">Application Type</Label>
        <Select onValueChange={(value) => setApplicationType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="event">Event Organization</SelectItem>
            <SelectItem value="budget">Budget Approval</SelectItem>
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
          {applicationType === "event" ? (
            <>
              <div className="grid gap-2">
                <Label>Student Coordinator Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Faculty Coordinator Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Dean Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label>Student Coordinator Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Faculty Coordinator Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Dean Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Director Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

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
    status: "pending",
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
        status: "pending",
      },
      {
        role: "Director",
        name: "Dr. James Wilson",
        email: "j.wilson@example.com",
        status: "pending",
      },
    ],
  },
]

export default function ApplicationPortal() {
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
                  <Select defaultValue="all">
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
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ScrollArea className="h-[calc(100vh-220px)]">
                    <div className="grid gap-4">
                      {sampleApplications.map((application) => (
                        <ApplicationCard key={application.id} {...application} application={application} />
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