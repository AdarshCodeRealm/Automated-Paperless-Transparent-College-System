import ComplaintShowcase from "../components/complaintShowcase"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { AlertCircle } from "lucide-react"
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
  const [complaintPopup,setComplaintPopup] = useState(false)
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true) // Set loading to true before fetching
    try {
      const response = await axios.get(
        `${backend_URL}/complaint`
      )
      if (
        response.data &&
        response.data.complaints &&
        Array.isArray(response.data.complaints)
      ) {
        setData(response.data.complaints) // Corrected data access
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
    setFilter(filter === "latest" ? "top-voted" : "latest")
  }

  return (
    <div>
      {loading ? (
        <p>Loading complaints...</p>
      ) : data.length > 0 ? (
        data.map((complaint) => (
          <ComplaintShowcase key={complaint.title} complaint={complaint} />
        ))
      ) : (
        <p>No complaints found.</p>
      )}

      <Button onClick={() => setComplaintPopup(true)} className="fixed bottom-4 right-4 shadow-lg" size="lg">
        <AlertCircle className="mr-2 h-4 w-4" />
        Raise Complaint
      </Button>
      <Dialog open={complaintPopup}>
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
        className="fixed bottom-16  right-4 shadow-lg"
        onClick={toggleFilter}
      >
        {filter === "latest" ? "Top Voted" : "Latest"}
      </Button>
    </div>
  )
}

export default ComplaintList
