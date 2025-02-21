"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { FileText, MoreVertical, Plus, User, FileSpreadsheet } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function AdminPage() {
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: "Anonymous Student",
      regNo: "2021BTCS001",
      fullName: "John Doe",
      year: "3rd",
      branch: "Computer Science",
      email: "john.doe@university.edu",
      date: "February 21, 2024",
      invigilator: "Dr. Sarah Parker",
      invigilatorId: "INV001",
      invigilatorEmail: "sarah.parker@university.edu",
      subjectCode: "CS301",
      subjectName: "Data Structures",
      examTime: "10:00 AM",
      reason: "Unauthorized use of electronic device during examination",
      proof: "Device confiscated, photographic evidence available",
    },
    {
      id: 2,
      studentName: "Anonymous Student",
      regNo: "2021BTCS002",
      fullName: "Jane Smith",
      year: "2nd",
      branch: "Computer Science",
      email: "jane.smith@university.edu",
      date: "February 20, 2024",
      invigilator: "Dr. Michael Brown",
      invigilatorId: "INV002",
      invigilatorEmail: "michael.brown@university.edu",
      subjectCode: "CS202",
      subjectName: "Database Systems",
      examTime: "2:00 PM",
      reason: "Plagiarism in final project submission",
      proof: "Similarity report attached",
    },
  ])

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
      setRecords(records.filter((record) => record.id !== id))
    }
  }

  return (
    <div className="min-h-screen p-6 dark:bg-gray-950">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cheating Record</h1>
          <p className="text-muted-foreground">Manage academic integrity violations</p>
        </div>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Violation Record</DialogTitle>
                <DialogDescription>Enter the details of the academic integrity violation.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="regNo">Registration Number</Label>
                    <Input id="regNo" placeholder="Enter registration number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter student name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="Enter year" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" placeholder="Enter branch" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subjectCode">Subject Code</Label>
                    <Input id="subjectCode" placeholder="Enter subject code" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subjectName">Subject Name</Label>
                    <Input id="subjectName" placeholder="Enter subject name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invigilator">Invigilator Name</Label>
                    <Input id="invigilator" placeholder="Enter invigilator name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invigilatorId">Invigilator ID</Label>
                    <Input id="invigilatorId" placeholder="Enter invigilator ID" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea id="reason" placeholder="Describe the violation" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proof">Evidence/Proof</Label>
                  <Input id="proof" type="file" />
                </div>
              </div>
              <Button>Submit Record</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Invigilator</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Evidence</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.invigilator}</TableCell>
                <TableCell className="max-w-[200px] truncate">{record.reason}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <User className="mr-2 h-4 w-4" />
                            Student Details
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Student Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Registration Number</Label>
                                <p className="text-sm text-muted-foreground">{record.regNo}</p>
                              </div>
                              <div>
                                <Label>Full Name</Label>
                                <p className="text-sm text-muted-foreground">{record.fullName}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Year</Label>
                                <p className="text-sm text-muted-foreground">{record.year}</p>
                              </div>
                              <div>
                                <Label>Branch</Label>
                                <p className="text-sm text-muted-foreground">{record.branch}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="text-sm text-muted-foreground">{record.email}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Exam Details
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Exam Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Subject Code</Label>
                                <p className="text-sm text-muted-foreground">{record.subjectCode}</p>
                              </div>
                              <div>
                                <Label>Subject Name</Label>
                                <p className="text-sm text-muted-foreground">{record.subjectName}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Invigilator Name</Label>
                                <p className="text-sm text-muted-foreground">{record.invigilator}</p>
                              </div>
                              <div>
                                <Label>Invigilator ID</Label>
                                <p className="text-sm text-muted-foreground">{record.invigilatorId}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Invigilator Email</Label>
                                <p className="text-sm text-muted-foreground">{record.invigilatorEmail}</p>
                              </div>
                              <div>
                                <Label>Exam Time</Label>
                                <p className="text-sm text-muted-foreground">
                                  {record.examTime} - {record.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => handleDelete(record.id)}
                      >
                        Delete Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

