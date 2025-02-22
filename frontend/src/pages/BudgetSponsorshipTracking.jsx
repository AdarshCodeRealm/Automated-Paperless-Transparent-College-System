"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FileUp, DollarSign, PieChart, Calendar, Utensils } from "lucide-react"

// Mock data for demonstration
const sponsorships = [
  { id: 1, sponsor: "Tech Corp", amount: 50000, purpose: "Annual Tech Fest" },
  { id: 2, sponsor: "Local Bank", amount: 25000, purpose: "Scholarship Fund" },
  { id: 3, sponsor: "Sports Brand", amount: 30000, purpose: "Athletics Equipment" },
]

const departmentBudgets = [
  { id: 1, department: "Computer Science", budget: 100000, spent: 75000 },
  { id: 2, department: "Mechanical Engineering", budget: 120000, spent: 90000 },
  { id: 3, department: "Electrical Engineering", budget: 110000, spent: 85000 },
]

const eventFunds = [
  { id: 1, event: "Annual Day", budget: 50000, spent: 48000 },
  { id: 2, event: "Tech Symposium", budget: 30000, spent: 28000 },
  { id: 3, event: "Cultural Fest", budget: 40000, spent: 39000 },
]

const messBudgets = [
  { id: 1, month: "January", budget: 200000, spent: 195000 },
  { id: 2, month: "February", budget: 200000, spent: 198000 },
  { id: 3, month: "March", budget: 200000, spent: 190000 },
]

export default function BudgetTracking() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically handle the file upload to a server
      console.log("Uploading file:", selectedFile.name)
      // Reset the selected file after upload
      setSelectedFile(null)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Transparent College Budget & Sponsorship Tracking</h1>

      <Tabs defaultValue="sponsorships" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
          <TabsTrigger value="department-budgets">Department Budgets</TabsTrigger>
          <TabsTrigger value="event-funds">Event Funds</TabsTrigger>
          <TabsTrigger value="mess-budgets">Mess Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="sponsorships">
          <Card>
            <CardHeader>
              <CardTitle>College Sponsorships</CardTitle>
              <CardDescription>Overview of all college sponsorships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sponsor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell>{sponsorship.sponsor}</TableCell>
                      <TableCell>${sponsorship.amount.toLocaleString()}</TableCell>
                      <TableCell>{sponsorship.purpose}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department-budgets">
          <Card>
            <CardHeader>
              <CardTitle>Department Budgets</CardTitle>
              <CardDescription>Budget allocation and spending by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentBudgets}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentBudgets.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell>{dept.department}</TableCell>
                      <TableCell>${dept.budget.toLocaleString()}</TableCell>
                      <TableCell>${dept.spent.toLocaleString()}</TableCell>
                      <TableCell>${(dept.budget - dept.spent).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="event-funds">
          <Card>
            <CardHeader>
              <CardTitle>Event Funds</CardTitle>
              <CardDescription>Budget and expenses for college events</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {eventFunds.map((event) => (
                  <AccordionItem value={`item-${event.id}`} key={event.id}>
                    <AccordionTrigger>{event.event}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>
                          <strong>Budget:</strong> ${event.budget.toLocaleString()}
                        </p>
                        <p>
                          <strong>Spent:</strong> ${event.spent.toLocaleString()}
                        </p>
                        <p>
                          <strong>Remaining:</strong> ${(event.budget - event.spent).toLocaleString()}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">View Expense Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Expense Details for {event.event}</DialogTitle>
                              <DialogDescription>Breakdown of expenses and uploaded proofs.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>Expense proofs and details would be displayed here.</p>
                              <p>Total Spent: ${event.spent.toLocaleString()}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mess-budgets">
          <Card>
            <CardHeader>
              <CardTitle>Mess Budgets</CardTitle>
              <CardDescription>Monthly mess budget management by students</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {messBudgets.map((month) => (
                  <div key={month.id} className="mb-4 last:mb-0">
                    <h3 className="text-lg font-semibold">{month.month}</h3>
                    <p>Budget: ${month.budget.toLocaleString()}</p>
                    <p>Spent: ${month.spent.toLocaleString()}</p>
                    <p>Remaining: ${(month.budget - month.spent).toLocaleString()}</p>
                    <Progress value={(month.spent / month.budget) * 100} className="mt-2" />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Upload Expense Proof</CardTitle>
          <CardDescription>Upload bills, receipts, or images for expense verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input id="picture" type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={!selectedFile}>
              <FileUp className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          {selectedFile && <p className="mt-2 text-sm text-muted-foreground">Selected file: {selectedFile.name}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,500,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,210,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mess Efficiency</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.5%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Custom Progress component
function Progress({ value, className }) {
  return (
    <div className={`h-2 w-full bg-gray-200 rounded-full ${className}`}>
      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${value}%` }} />
    </div>
  )
}