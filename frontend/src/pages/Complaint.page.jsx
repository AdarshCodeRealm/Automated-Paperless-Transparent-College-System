import ComplaintShowcase from "../components/complaintShowcase"
import { useState } from "react"
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

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
function ComplaintList() {
  const [title, setTitle] = useState("")
  const [description, setContent] = useState("")
  const [category, setCategory] = useState("") // State to store selected fruit
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("latest") // Default filter

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !category) {
      setError("All fields are required")
      return
    }
    try {
      axios
        .post("http://localhost:3000/complaints", {
          title,
          description,
          category,
          attachments,
        })
        .then((res) => {
          console.log(res)
        })
    } catch (error) {
      console.log(error)
    }

    console.log("Submit")
    console.log(category)
  }
  const data = [
    {
      id: 1,
      user: "anonymous_user",
      postedBy: "[deleted]",
      timeAgo: "5 months ago",
      title: "Poor Learning Environment",
      content: "I came into college with a thirst... ",
      votes: 25,
      comments: ["I feel the same way!", "It's challenging."],
    },
    // ... (rest of your complaint data)
    {
      id: 2,
      user: "college issues",
      postedBy: "Commuter",
      timeAgo: "2 months ago",
      title: "Limited Parking",
      content: "Finding parking on campus is a nightmare...",
      votes: 6,
      comments: [],
    },

    {
      id: 3,
      user: "parking_problems",
      postedBy: "Commuter",
      timeAgo: "2 months ago",
      title: "Limited Parking",
      content: "Finding parking on campus is a nightmare...",
      votes: 6,
      comments: [],
    },
    {
      id: 4,
      user: "anonymous_user",
      postedBy: "[deleted]",
      timeAgo: "5 months ago",
      title: "Poor Learning Environment",
      content: "I came into college with a thirst... ",
      votes: 25,
      comments: ["I feel the same way!", "It's challenging."],
    },

    {
      id: 5,
      user: "college issues",
      postedBy: "Commuter",
      timeAgo: "2 months ago",
      title: "Limited Parking",
      content: "Finding parking on campus is a nightmare...",
      votes: 6,
      comments: [],
    },
    // ... (rest of your complaint data)
    {
      id: 6,
      user: "parking_problems",
      postedBy: "Commuter",
      timeAgo: "2 months ago",
      title: "Limited Parking",
      content: "Finding parking on campus is a nightmare...",
      votes: 6,
      comments: [],
    },
    // ... (rest of your complaint data)
  ]
  const toggleFilter = () => {
    setFilter(filter === "latest" ? "top-voted" : "latest");
  };

  return (
    <div>
      {data.map((complaint) => (
        <ComplaintShowcase key={complaint.title} complaint={complaint} />
      ))}

      <Dialog>
        <DialogTrigger asChild>
        
          <Button className="fixed bottom-4 right-4 shadow-lg" size="lg">
            <AlertCircle className="mr-2 h-4 w-4" />
            Raise Complaint
          </Button>
        </DialogTrigger>
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
            <div className="space-y-2">
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
                  <SelectValue placeholder="Select category" />{" "}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
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
      
      <Button className="fixed bottom-16  right-4 shadow-lg" onClick={toggleFilter}>
        {filter === "latest" ? "Top Voted" : "Latest"}
      </Button>
    </div>
  )
}

export default ComplaintList
