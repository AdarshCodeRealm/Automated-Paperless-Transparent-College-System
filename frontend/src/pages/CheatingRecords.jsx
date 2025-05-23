"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import PropTypes from "prop-types"
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
import { backend_URL } from "@/utils/constant"
export default function AdminPage() {
  const fileInputRef = useRef(null)
  useEffect(() => {
    fetchViolations()
  }, [])
  const [records, setRecords] = useState([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async () => {
    try {
      // For demonstration, add the new record to our dummy data instead
      const newRecord = {
        _id: `rec${Math.floor(Math.random() * 1000)}`,
        registrationNumber: newViolation.registrationNumber,
        fullName: newViolation.fullName,
        year: newViolation.year,
        branch: newViolation.branch,
        email: newViolation.email,
        subjectCode: newViolation.subjectCode,
        subjectName: newViolation.subjectName,
        invigilatorName: newViolation.invigilatorName,
        invigilatorID: newViolation.invigilatorID,
        reason: newViolation.reason,
        evidence: newViolation.evidence ? [newViolation.evidence.name] : [],
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }

      setRecords([newRecord, ...records])
      toast.success("Record created successfully!")

      // Reset form
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

      /* Uncomment for real API call
      console.log(newViolation)
      const formData = new FormData()
      for (const key in newViolation) {
        formData.append(key, newViolation[key])
      }
      await axios.post(
        `${backend_URL}/integrityAndCheatingRecord`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      fetchViolations()
      */
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
        // For demonstration, remove from local state
        setRecords(records.filter((record) => record._id !== id))
        toast.success("Record deleted successfully!")

        /* Uncomment for real API call
        await axios.delete(
          `${backend_URL}/integrityAndCheatingRecord/${id}`
        )
        fetchViolations()
        */
      } catch (error) {
        console.error("Error deleting violation:", error)
      }
    }
  }

  const fetchViolations = async () => {
    setRecords([]) // Clear records

    try {
      // For demonstration, use dummy data instead of API call
      setTimeout(() => {
        setRecords(dummyRecords)
      }, 1000)

      /* Uncomment for real API call
      const response = await axios.get(
        `${backend_URL}/integrityAndCheatingRecord`
      )
      if (response.status === 200) {
        setRecords(response.data)
      }
      */
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

  // Add dummy data for demonstration
  const dummyRecords = [
    {
      _id: "rec1",
      registrationNumber: "BT20CS045",
      fullName: "Aditya Sharma",
      year: "3rd Year",
      branch: "Computer Science",
      email: "aditya.sharma@university.edu",
      subjectCode: "CS301",
      subjectName: "Data Structures and Algorithms",
      invigilatorName: "Dr. Rajesh Gupta",
      invigilatorID: "FAC112",
      reason:
        "Found using unauthorized handwritten notes during examination",
      evidence: ["evidence1.pdf"],
      createdAt: "2025-05-10T09:30:00Z",
      date: "May 10, 2025",
    },
    {
      _id: "rec2",
      registrationNumber: "BT21EC032",
      fullName: "Priya Patel",
      year: "2nd Year",
      branch: "Electronics",
      email: "priya.patel@university.edu",
      subjectCode: "EC204",
      subjectName: "Digital Electronics",
      invigilatorName: "Dr. Meena Singh",
      invigilatorID: "FAC098",
      reason:
        "Caught using mobile phone to access information during exam",
      evidence: ["evidence2.jpg"],
      createdAt: "2025-05-12T14:15:00Z",
      date: "May 12, 2025",
    },
    {
      _id: "rec3",
      registrationNumber: "BT22ME019",
      fullName: "Rahul Verma",
      year: "1st Year",
      branch: "Mechanical Engineering",
      email: "rahul.verma@university.edu",
      subjectCode: "ME101",
      subjectName: "Engineering Mechanics",
      invigilatorName: "Prof. Sanjay Kumar",
      invigilatorID: "FAC076",
      reason:
        "Caught communicating with another student during examination",
      evidence: ["evidence3.mp4"],
      createdAt: "2025-05-15T10:45:00Z",
      date: "May 15, 2025",
    },
    {
      _id: "rec4",
      registrationNumber: "BT19CV022",
      fullName: "Neha Gupta",
      year: "4th Year",
      branch: "Civil Engineering",
      email: "neha.gupta@university.edu",
      subjectCode: "CV405",
      subjectName: "Structural Design",
      invigilatorName: "Dr. Anand Mishra",
      invigilatorID: "FAC054",
      reason:
        "Submission of identical project report with another student, evidence of plagiarism",
      evidence: ["evidence4.pdf"],
      createdAt: "2025-05-18T16:30:00Z",
      date: "May 18, 2025",
    },
    {
      _id: "rec5",
      registrationNumber: "BT20EE011",
      fullName: "Arjun Mehta",
      year: "3rd Year",
      branch: "Electrical Engineering",
      email: "arjun.mehta@university.edu",
      subjectCode: "EE307",
      subjectName: "Power Systems",
      invigilatorName: "Prof. Leela Krishnan",
      invigilatorID: "FAC089",
      reason:
        "Unauthorized formula sheet found in possession during examination",
      evidence: ["evidence5.jpg"],
      createdAt: "2025-05-20T11:20:00Z",
      date: "May 20, 2025",
    },
  ]

  return (
    <div className="min-h-screen p-6 dark:bg-gray-950">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cheating Record</h1>
          <p className="text-muted-foreground">
            Manage academic integrity violations
          </p>
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
            {records &&
              records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {record.createdAt
                      ? new Date(record.createdAt).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "short", year: "numeric" }
                        )
                      : "N/A"}
                  </TableCell>
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

AdminPage.propTypes = {
  // This component doesn't receive any props directly
}
