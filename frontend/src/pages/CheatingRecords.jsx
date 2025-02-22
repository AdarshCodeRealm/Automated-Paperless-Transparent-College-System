"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  MoreVertical,
  Plus,
  User,
  FileSpreadsheet,
} from "lucide-react"
import { toast } from "react-toastify"
import { useState, useRef } from "react"
import axios from "axios"
export default function AdminPage() {
  const fileInputRef = useRef(null)
  useEffect(() => {
    fetchViolations()
  }, [])
  const [records, setRecords] = useState([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async () => {
    try {
      console.log(newViolation)
      const formData = new FormData()
      for (const key in newViolation) {
        formData.append(key, newViolation[key])
      }
      await axios.post(
        "https://hackfusion-2025.onrender.com/integrityAndCheatingRecord",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      toast.success("Record created successfully!")

      fetchViolations()
      setNewViolation({
        registrationNumber: "",
        fullName: "",
        year: "",
        branch: "",
        email: "",
        subjectCode: "",
        subjectName: "",
        invigilatorName: "",
        invigilatorID: "",
        reason: "",
        evidence: null,
      })
      if (fileInputRef.current) {
        // Reset the file input
        fileInputRef.current.value = ""
      }
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error creating violation:", error)
    }
  }

  const handleDelete = async (id) => {
    if (
      confirm(
        "Are you sure you want to delete this record? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          `https://hackfusion-2025.onrender.com/integrityAndCheatingRecord/${id}`
        ) // Adjust the API endpoint as needed
        toast.success("Record deleted successfully!")
        fetchViolations()
      } catch (error) {
        console.error("Error deleting violation:", error)
      }
    }
  }

  const fetchViolations = async () => {
    try {
      const response = await axios.get(
        "https://hackfusion-2025.onrender.com/integrityAndCheatingRecord"
      ) // Adjust the API endpoint as needed
      if (response.status === 200) {
        console.log(response.data)
        setRecords(response.data)
      }
    } catch (error) {
      console.error("Error fetching violations:", error)
    }
  }

  const handleInputChange = (e) => {
    setNewViolation({ ...newViolation, [e.target.id]: e.target.value })
  }
  const handleInputChangeTextBox = (event) => {
    const { name, value } = event.target
    setNewViolation((prevViolation) => ({
      ...prevViolation,
      [name]: value,
    }))
  }
  const handleFileChange = (e) => {
    setNewViolation({ ...newViolation, evidence: e.target.files[0] })
  }

  const [newViolation, setNewViolation] = useState({
    registrationNumber: "",
    fullName: "",
    year: "",
    branch: "",
    email: "",
    subjectCode: "",
    subjectName: "",
    invigilatorName: "",
    invigilatorID: "",
    reason: "",
    evidence: null,
  })

  return (
    <div className="min-h-screen p-6 dark:bg-gray-950">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cheating Record</h1>
          <p className="text-muted-foreground">Manage academic integrity violations</p>
        </div>
        <div className="flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Violation Record</DialogTitle>
                <DialogDescription>
                  Enter the details of the academic integrity violation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="regNo">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      value={newViolation.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={newViolation.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter student name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={newViolation.year}
                      onChange={handleInputChange}
                      placeholder="Enter year"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      value={newViolation.branch}
                      onChange={handleInputChange}
                      placeholder="Enter branch"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newViolation.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subjectCode">Subject Code</Label>
                    <Input
                      id="subjectCode"
                      value={newViolation.subjectCode}
                      onChange={handleInputChange}
                      placeholder="Enter subject code"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subjectName">Subject Name</Label>
                    <Input
                      id="subjectName"
                      value={newViolation.subjectName}
                      onChange={handleInputChange}
                      placeholder="Enter subject name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invigilator">Invigilator Name</Label>
                    <Input
                      id="invigilatorName"
                      value={newViolation.invigilatorName}
                      onChange={handleInputChange}
                      placeholder="Enter invigilator name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invigilatorId">Invigilator ID</Label>
                    <Input
                      id="invigilatorID"
                      value={newViolation.invigilatorID}
                      onChange={handleInputChange}
                      placeholder="Enter invigilator ID"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason "
                    name="reason"
                    value={newViolation.reason}
                    onChange={handleInputChangeTextBox}
                    placeholder="Describe the violation"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proof">Evidence/Proof</Label>
                  <Input
                    id="evidence"
                    onChange={handleFileChange}
                    type="file"
                    ref={fileInputRef}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit}>Submit Record</Button>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <br />
      {/* Add New Record Button */}
      <div className="mb-4 flex justify-end">
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

      {/* Table */}
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
            {records &&
              records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.createdAt}</TableCell>
                  <TableCell>{record.fullName}</TableCell>
                  <TableCell>{record.invigilatorName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {record.reason}
                  </TableCell>
                  <TableCell>
                    <a
                      href={
                        record.evidence &&
                        Array.isArray(record.evidence) &&
                        record.evidence.length > 0
                          ? record.evidence[0]
                          : ""
                      }
                      download
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <FileText
                        className="h-4 w-4"
                        style={{ marginRight: "8px" }}
                      />
                    </a>
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
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
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
                                  <p className="text-sm text-muted-foreground">
                                    {record.registrationNumber}
                                  </p>
                                </div>
                                <div>
                                  <Label>Full Name</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.fullName}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Year</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.year}
                                  </p>
                                </div>
                                <div>
                                  <Label>Branch</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.branch}
                                  </p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
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
                                  <p className="text-sm text-muted-foreground">
                                    {record.subjectCode}
                                  </p>
                                </div>
                                <div>
                                  <Label>Subject Name</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.subjectName}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Invigilator Name</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.invigilatorName}
                                  </p>
                                </div>
                                <div>
                                  <Label>Invigilator ID</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.invigilatorID}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Invigilator Email</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.invigilatorEmail || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <Label>Exam Date</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {record.createdAt} - {record.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => handleDelete(record._id)}
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