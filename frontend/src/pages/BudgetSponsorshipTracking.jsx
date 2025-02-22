"use client"

import { Plus } from "lucide-react"
import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  FileUp,
  DollarSign,
  PieChart,
  Calendar,
  Utensils,
  Eye,
} from "lucide-react"

// Mock data for demonstration
const sponsorships = [
  {
    id: 1,
    sponsor: "Tech Corp",
    amount: 50000,
    purpose: "Annual Tech Fest",
    proofOfPayment: "techcorp_payment_proof.pdf",
    expenseProofs: ["techfest_expense_1.pdf", "techfest_expense_2.pdf"],
  },
  {
    id: 2,
    sponsor: "Local Bank",
    amount: 25000,
    purpose: "Scholarship Fund",
    proofOfPayment: "localbank_payment_proof.pdf",
    expenseProofs: ["scholarship_expense_1.pdf", "scholarship_expense_2.pdf"],
  },
  {
    id: 3,
    sponsor: "Sports Brand",
    amount: 30000,
    purpose: "Athletics Equipment",
    proofOfPayment: "sportsbrand_payment_proof.pdf",
    expenseProofs: ["athletics_expense_1.pdf", "athletics_expense_2.pdf"],
  },
]

const departmentBudgets = [
  {
    id: 1,
    department: "Computer Science",
    budget: 100000,
    spent: 75000,
    expenseProofs: ["cs_expense_1.pdf", "cs_expense_2.pdf"],
  },
  {
    id: 2,
    department: "Mechanical Engineering",
    budget: 120000,
    spent: 90000,
    expenseProofs: ["me_expense_1.pdf", "me_expense_2.pdf"],
  },
  {
    id: 3,
    department: "Electrical Engineering",
    budget: 110000,
    spent: 85000,
    expenseProofs: ["ee_expense_1.pdf", "ee_expense_2.pdf"],
  },
]

const eventFunds = [
  { id: 1, event: "Annual Day", budget: 50000, spent: 48000 },
  { id: 2, event: "Tech Symposium", budget: 30000, spent: 28000 },
  { id: 3, event: "Cultural Fest", budget: 40000, spent: 39000 },
]

const initialMessBudgets = [
  {
    id: 1,
    month: "January",
    budget: 200000,
    spent: 195000,
    expenseProofs: ["january_receipt_1.pdf", "january_receipt_2.pdf"],
  },
  {
    id: 2,
    month: "February",
    budget: 200000,
    spent: 198000,
    expenseProofs: ["february_receipt_1.pdf", "february_receipt_2.pdf"],
  },
  {
    id: 3,
    month: "March",
    budget: 200000,
    spent: 190000,
    expenseProofs: ["march_receipt_1.pdf", "march_receipt_2.pdf"],
  },
];

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

  const [messBudgets, setMessBudgets] = useState(initialMessBudgets);
  const [newBudget, setNewBudget] = useState({
    month: "",
    budget: 0,
    spent: 0,
    expenseProofs: [],
  });

  const handleAddDetails = () => {
    if (!newBudget.month || !newBudget.budget || !newBudget.spent) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedBudgets = [
      ...messBudgets,
      {
        id: messBudgets.length + 1,
        ...newBudget,
      },
    ];
    setMessBudgets(updatedBudgets);
    setNewBudget({ month: "", budget: 0, spent: 0, expenseProofs: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 rounded-3xl">
      {/*<h1 className="text-3xl font-bold text-center mb-8">
        Transparent College Budget & Sponsorship Tracking
      </h1>*/}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-2xl font-semibold">
            Budget & Sponsorship Tracker
          </h1>
        </div>
      </header>
      <br />
      <Tabs defaultValue="sponsorships" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
          <TabsTrigger value="department-budgets">
            Department Budgets
          </TabsTrigger>
          <TabsTrigger value="event-funds">Event Funds</TabsTrigger>
          <TabsTrigger value="mess-budgets">Mess Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="sponsorships">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>College Sponsorships</CardTitle>
                  <CardDescription>
                    Overview of all college sponsorships
                  </CardDescription>
                </div>
                {/* Add Details Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Sponsers
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Sponsorship Details</DialogTitle>
                      <DialogDescription>
                        Enter the details of the sponsorship, including proof of
                        payment and expense proofs.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Sponsor */}
                      <div className="grid gap-2">
                        <Label htmlFor="sponsor">Sponsor</Label>
                        <Input id="sponsor" placeholder="Enter sponsor name" />
                      </div>

                      {/* Amount */}
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>

                      {/* Purpose */}
                      <div className="grid gap-2">
                        <Label htmlFor="purpose">Purpose</Label>
                        <Textarea
                          id="purpose"
                          placeholder="Enter purpose of sponsorship"
                        />
                      </div>

                      {/* Proof of Payment */}
                      <div className="grid gap-2">
                        <Label htmlFor="proofOfPayment">Proof of Payment</Label>
                        <Input id="proofOfPayment" type="file" multiple />
                      </div>

                      {/* Expense Proofs */}
                      <div className="grid gap-2">
                        <Label htmlFor="expenseProofs">Expense Proofs</Label>
                        <Input id="expenseProofs" type="file" multiple />
                      </div>
                    </div>
                    <Button type="submit">Save Details</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sponsor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell>{sponsorship.sponsor}</TableCell>
                      <TableCell>
                        ${sponsorship.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{sponsorship.purpose}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                {sponsorship.sponsor} Sponsorship Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>
                                <strong>Amount:</strong> $
                                {sponsorship.amount.toLocaleString()}
                              </p>
                              <p>
                                <strong>Purpose:</strong> {sponsorship.purpose}
                              </p>
                              <div>
                                <h4 className="mb-2 font-semibold">
                                  Proof of Payment:
                                </h4>
                                <p>{sponsorship.proofOfPayment}</p>
                              </div>
                              <div>
                                <h4 className="mb-2 font-semibold">
                                  Expense Proofs:
                                </h4>
                                <ul className="list-disc pl-5">
                                  {sponsorship.expenseProofs.map(
                                    (proof, index) => (
                                      <li key={index}>{proof}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department Budgets</CardTitle>
                  <CardDescription>
                    Budget allocation and spending by department
                  </CardDescription>
                </div>
                {/* Add Details Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Budget
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Department Budget Details</DialogTitle>
                      <DialogDescription>
                        Enter the details for the department budget.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Department */}
                      <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="Enter department name"
                        />
                      </div>

                      {/* Budget */}
                      <div className="grid gap-2">
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="Enter budget amount"
                        />
                      </div>

                      {/* Spent */}
                      <div className="grid gap-2">
                        <Label htmlFor="spent">Spent</Label>
                        <Input
                          id="spent"
                          type="number"
                          placeholder="Enter amount spent"
                        />
                      </div>

                      {/* Remaining */}
                      <div className="grid gap-2">
                        <Label htmlFor="remaining">Remaining</Label>
                        <Input
                          id="remaining"
                          type="number"
                          placeholder="Enter remaining amount"
                        />
                      </div>

                      {/* Expense Proof (Multiple Files) */}
                      <div className="grid gap-2">
                        <Label htmlFor="expenseProof">Expense Proof</Label>
                        <Input
                          id="expenseProof"
                          type="file"
                          multiple // Allow multiple file uploads
                        />
                      </div>
                    </div>
                    <Button type="submit">Save Details</Button>
                  </DialogContent>
                </Dialog>
              </div>
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
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentBudgets.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell>{dept.department}</TableCell>
                      <TableCell>${dept.budget.toLocaleString()}</TableCell>
                      <TableCell>${dept.spent.toLocaleString()}</TableCell>
                      <TableCell>
                        ${(dept.budget - dept.spent).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                {dept.department} Budget Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>
                                <strong>Budget:</strong> $
                                {dept.budget.toLocaleString()}
                              </p>
                              <p>
                                <strong>Spent:</strong> $
                                {dept.spent.toLocaleString()}
                              </p>
                              <p>
                                <strong>Remaining:</strong> $
                                {(dept.budget - dept.spent).toLocaleString()}
                              </p>
                              <div>
                                <h4 className="mb-2 font-semibold">
                                  Expense Proofs:
                                </h4>
                                <ul className="list-disc pl-5">
                                  {dept.expenseProofs.map((proof, index) => (
                                    <li key={index}>{proof}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Event Funds</CardTitle>
                  <CardDescription>
                    Budget and expenses for college events
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Event Details</DialogTitle>
                      <DialogDescription>
                        Enter the event details and upload expense proofs.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event" className="text-right">
                          Event
                        </Label>
                        <Input id="event" placeholder="Event Name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="budget" className="text-right">
                          Budget
                        </Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="Budget"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="spent" className="text-right">
                          Spent
                        </Label>
                        <Input
                          id="spent"
                          type="number"
                          placeholder="Amount Spent"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="remaining" className="text-right">
                          Remaining
                        </Label>
                        <Input
                          id="remaining"
                          type="number"
                          placeholder="Remaining Amount"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="proof" className="text-right">
                          Expense Proof
                        </Label>
                        <Input
                          id="proof"
                          type="file"
                          multiple
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                          <strong>Remaining:</strong> $
                          {(event.budget - event.spent).toLocaleString()}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">View Expense Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Expense Details for {event.event}
                              </DialogTitle>
                              <DialogDescription>
                                Breakdown of expenses and uploaded proofs.
                              </DialogDescription>
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

        return (
        <TabsContent value="mess-budgets">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mess Budgets</CardTitle>
                  <CardDescription>Monthly mess budget management by students</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                  <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Budget
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Mess Budget Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <label>Month</label>
                        <input
                          type="text"
                          value={newBudget.month}
                          onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>Budget</label>
                        <input
                          type="number"
                          value={newBudget.budget}
                          onChange={(e) => setNewBudget({ ...newBudget, budget: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label>Spent</label>
                        <input
                          type="number"
                          value={newBudget.spent}
                          onChange={(e) => setNewBudget({ ...newBudget, spent: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label>Expense Proofs</label>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => setNewBudget({ ...newBudget, expenseProofs: [...e.target.files] })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddDetails}>Save</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {messBudgets.map((month) => (
                  <div key={month.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{month.month}</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{month.month} Mess Budget Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <p>
                              <strong>Budget:</strong> ${month.budget.toLocaleString()}
                            </p>
                            <p>
                              <strong>Spent:</strong> ${month.spent.toLocaleString()}
                            </p>
                            <p>
                              <strong>Remaining:</strong> ${(month.budget - month.spent).toLocaleString()}
                            </p>
                            <div>
                              <h4 className="mb-2 font-semibold">Expense Proofs:</h4>
                              <ul className="list-disc pl-5">
                                {month.expenseProofs.map((proof, index) => (
                                  <li key={index}>{proof.name}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p>Budget: ${month.budget.toLocaleString()}</p>
                    <p>Spent: ${month.spent.toLocaleString()}</p>
                    <p>
                      Remaining: ${(month.budget - month.spent).toLocaleString()}
                    </p>
                    <Progress
                      value={(month.spent / month.budget) * 100}
                      className="mt-2"
                    />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        );

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
              <CardTitle className="text-sm font-medium">
                Mess Efficiency
              </CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">97.5%</div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}

// Custom Progress component
function Progress({ value, className }) {
  return (
    <div className={`h-2 w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="h-full bg-blue-600 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
