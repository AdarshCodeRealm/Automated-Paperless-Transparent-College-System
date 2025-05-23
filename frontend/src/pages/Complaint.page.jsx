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

// Sample complaint data for direct rendering
const sampleComplaints = [
  {
    _id: "sample1",
    title: "Poor Internet Connectivity in Hostel Block C",
    description:
      "The internet in Block C has been extremely slow for the past week. Students are unable to attend online classes or submit assignments on time. This is affecting our academic performance.",
    category: "Facility",
    status: "Open",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    voteCount: 7,
    upvote: [],
  },
  {
    _id: "sample2",
    title: "Cafeteria Food Quality Issues",
    description:
      "The food quality in the main cafeteria has declined significantly over the past month. Several students have reported stomach issues after eating there. We request an urgent inspection and improvement.",
    category: "Student Life",
    status: "In Progress",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    voteCount: 11,
    upvote: [],
  },
  {
    _id: "sample3",
    title: "Library Noise Level During Exam Week",
    description:
      "Despite being a quiet zone, the library has been extremely noisy during exam week. The staff is not enforcing the rules, and it's impossible to concentrate on studies. Please address this issue.",
    category: "Academic",
    status: "Resolved",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    voteCount: 15,
    upvote: [],
  },
  {
    _id: "sample4",
    title: "Broken Air Conditioning in CS Department",
    description:
      "The air conditioning in the Computer Science department has been malfunctioning for two weeks now. The labs are uncomfortably hot, making it difficult to concentrate during practical sessions.",
    category: "Facility",
    status: "In Progress",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    voteCount: 9,
    upvote: [],
  },
  {
    _id: "sample5",
    title: "Parking Space Shortage for Students",
    description:
      "There is a severe shortage of parking spaces for students who commute. Many are forced to park far away or in unauthorized areas, resulting in fines. We need more designated student parking areas.",
    category: "Infrastructure",
    status: "Open",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    voteCount: 23,
    upvote: [],
  },
]

function ComplaintList() {
  const [title, setTitle] = useState("")
  const [description, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [attachments, setAttachments] = useState([])
  const [filter, setFilter] = useState("latest")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [complaintPopup, setComplaintPopup] = useState(false)
  const [useLocalData, setUseLocalData] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${backend_URL}/complaint`)
      console.log("API Response:", response.data)
      if (
        response.data &&
        response.data.complaints &&
        Array.isArray(response.data.complaints) &&
        response.data.complaints.length > 0
      ) {
        const complaints = response.data.complaints
        if (filter === "latest") {
          complaints.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        } else if (filter === "top-voted") {
          complaints.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
        }

        setData(complaints)
        setUseLocalData(false)
      } else {
        console.log("No complaints found from API, using sample data")
        setUseLocalData(true)
        // Sort sample data based on the current filter
        const sortedSamples = [...sampleComplaints]
        if (filter === "latest") {
          sortedSamples.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        } else if (filter === "top-voted") {
          sortedSamples.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
        }
        setData(sortedSamples)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      console.log("Error fetching data, using sample data")
      setUseLocalData(true)
      setData(sampleComplaints)
    } finally {
      setLoading(false)
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
        .post(`${backend_URL}/complaint/createComplaint`, {
          title,
          description,
          category,
          attachments,
          id,
        })
        .then((res) => {
          console.log(res)
          setComplaintPopup(false)
          setTitle("")
          setContent("")
          setCategory("")
          setAttachments([])
          setUseLocalData(false) // Switch to using API data after submitting
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
      const response = await axios.post(`${backend_URL}/complaint/seed-data`, {
        clearExisting: false,
      })

      if (response.data && response.data.status === "success") {
        toast.success(response.data.message)
        setUseLocalData(false) // Switch to API data after adding samples
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

  // Handle upvoting of local sample complaints
  const handleLocalUpvote = (complaintId) => {
    setData((prevData) =>
      prevData.map((complaint) =>
        complaint._id === complaintId
          ? { ...complaint, voteCount: complaint.voteCount + 1 }
          : complaint
      )
    )
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
            <ComplaintShowcase
              key={complaint._id}
              complaint={complaint}
              onLocalUpvote={
                useLocalData
                  ? () => handleLocalUpvote(complaint._id)
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">
            No complaints found. Click &quot;Add Sample Complaints&quot; to
            generate some example data.
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

        {!useLocalData && (
          <Button
            onClick={addHardCodedComplaints}
            className="shadow-lg bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            <Database className="mr-2 h-4 w-4" />
            Add Sample Complaints
          </Button>
        )}
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

ComplaintList.propTypes = {
  // This component doesn't receive any props directly
}

export default ComplaintList
