import ComplaintShowcase from "../components/complaintShowcase"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { AlertCircle, Database } from "lucide-react"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { toast } from "react-toastify"
import { backend_URL } from "@/utils/constant"

function ComplaintList() {
  const [title, setTitle] = useState("")
  const [description, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [attachments, setAttachments] = useState([])
  const [filter, setFilter] = useState("latest")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state
  const [complaintPopup, setComplaintPopup] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true) // Set loading to true before fetching
    try {
      const response = await axios.get(`${backend_URL}/complaint`)

      console.log("API Response:", response.data) // Debug logging

      if (
        response.data &&
        response.data.complaints &&
        Array.isArray(response.data.complaints)
      ) {
        const complaints = response.data.complaints

        // Sort complaints based on filter
        if (filter === "latest") {
          complaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        } else if (filter === "top-voted") {
          complaints.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
        }

        setData(complaints)
      } else {
        console.error("API response is invalid:", response.data)
        setData([])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !category) {
      toast.error("All fields are required")
      return
    }
    try {
      console.log(title, description, category)
      const id = localStorage.getItem("id")
      axios
        .post(
          `${backend_URL}/complaint/createComplaint`,
          {
            title,
            description,
            category,
            attachments,
            id,
          }
        )
        .then((res) => {
          console.log(res)
          setComplaintPopup(false)
          setTitle("")
          setContent("")
          setCategory("")
          setAttachments([])
          fetchData()
          toast.success("Complaint submitted successfully")
        })
    } catch (error) {
      console.log(error)
    }
    console.log("Submit")
    console.log(category)
  }

  const toggleFilter = () => {
    const newFilter = filter === "latest" ? "top-voted" : "latest"
    setFilter(newFilter)

    // Re-sort the existing data without making a new API call
    const sortedData = [...data]
    if (newFilter === "latest") {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else {
      sortedData.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
    }
    setData(sortedData)
  }

  const addHardCodedComplaints = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${backend_URL}/complaint/seed-data`,
        { clearExisting: false }
      )

      if (response.data && response.data.status === "success") {
        toast.success(response.data.message)
        fetchData() // Refresh the complaints list
      } else {
        toast.error("Failed to add sample complaints")
      }
    } catch (error) {
      console.error("Error adding sample complaints:", error)
      toast.error(
        error.response?.data?.message || "Failed to add sample complaints"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">Loading complaints...</p>
        </div>
      ) : data.length > 0 ? (
        <div className="space-y-4">
          {data.map((complaint) => (
            <ComplaintShowcase key={complaint._id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">
            No complaints found. Click "Add Sample Complaints" to generate some
            example data.
          </p>
        </div>
      )}

      <div className="fixed bottom-4 right-4 space-y-2 flex flex-col">
        <Button
          onClick={() => setComplaintPopup(true)}
          className="shadow-lg"
          size="lg"
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Raise Complaint
        </Button>

        <Button
          onClick={addHardCodedComplaints}
          className="shadow-lg bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          <Database className="mr-2 h-4 w-4" />
          Add Sample Complaints
        </Button>
      </div>

      <Dialog open={complaintPopup} onOpenChange={setComplaintPopup}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Raise a Complaint</DialogTitle>
            <DialogDescription>
              Submit your complaint here. We will review it and take necessary
              action.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Complaint Heading</Label>
              <Input
                id="heading"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the subject of your complaint"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide detailed information about your complaint"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-x-3 flex flex-row items-end">
              <div className="space-y-2">
                <Label htmlFor="heading">Complaint Attachment (Optional)</Label>
                <Input
                  id=""
                  type="file"
                  multiple="true"
                  onChange={(e) => setAttachments(e.target.files)}
                  placeholder="Add Attachment File"
                />
              </div>
              <Select onValueChange={(e) => setCategory(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Facility">Facility</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Student Life">Student Life</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Submit Complaint</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        className="fixed bottom-40 right-4 shadow-lg"
        onClick={toggleFilter}
      >
        {filter === "latest" ? "Top Voted" : "Latest"}
      </Button>
    </div>
  )
}

export default ComplaintList
