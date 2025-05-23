"use client"

import  { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  Activity,
  Users,
  Vote,
  BarChart2,
  ListFilter,
  Search,
  UserPlus,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"

// Mock data for election results visualization
const mockData = [
  { name: "Aarav Patel", position: "President", votes: 1254, percentage: "42%" },
  { name: "Priya Singh", position: "President", votes: 982, percentage: "33%" },
  { name: "Vikram Sharma", position: "President", votes: 745, percentage: "25%" },
  
  { name: "Neha Gupta", position: "Vice President", votes: 1105, percentage: "37%" },
  { name: "Arjun Mehta", position: "Vice President", votes: 1053, percentage: "35%" },
  { name: "Kiran Kumar", position: "Vice President", votes: 830, percentage: "28%" },
  
  { name: "Ravi Verma", position: "General Secretary", votes: 1486, percentage: "50%" },
  { name: "Anjali Reddy", position: "General Secretary", votes: 1479, percentage: "50%" },
  
  { name: "Sanjay Desai", position: "Treasurer", votes: 1632, percentage: "55%" },
  { name: "Meera Joshi", position: "Treasurer", votes: 1342, percentage: "45%" }
]

// Comprehensive data for upcoming elections
const upcomingElections = [
  {
    id: 1,
    title: "STUDENT COUNCIL ELECTION 2025-26",
    description: "Annual election for the main student governing body positions including President, Vice President, General Secretary, and Treasurer",
    date: "2025-05-25",
    startTime: "08:00 AM",
    endTime: "06:00 PM",
    timeLeft: "2d 23h 15m 45s",
    eligibleVoters: 4250,
    positions: ["President", "Vice President", "General Secretary", "Treasurer"],
    nominationDeadline: "2025-05-15",
    campaignPeriod: "2025-05-16 to 2025-05-24",
    resultsAnnouncement: "2025-05-26"
  },
  {
    id: 2,
    title: "DEPARTMENT REPRESENTATIVES ELECTION",
    description: "Election for student representatives from each academic department",
    date: "2025-05-28",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    timeLeft: "5d 21h 45m 30s",
    eligibleVoters: 4250,
    positions: ["CS Rep", "ME Rep", "EE Rep", "CE Rep", "CH Rep"],
    nominationDeadline: "2025-05-20",
    campaignPeriod: "2025-05-21 to 2025-05-27",
    resultsAnnouncement: "2025-05-29"
  },
  {
    id: 3,
    title: "HOSTEL COMMITTEE ELECTION",
    description: "Election for hostel block representatives and committee members",
    date: "2025-06-02",
    startTime: "10:00 AM",
    endTime: "08:00 PM",
    timeLeft: "10d 12h 30m 15s",
    eligibleVoters: 3200,
    positions: ["Chief Warden", "Block Representatives", "Mess Secretary", "Sports Coordinator"],
    nominationDeadline: "2025-05-25",
    campaignPeriod: "2025-05-26 to 2025-06-01",
    resultsAnnouncement: "2025-06-03"
  }
]

// Expanded candidates data
const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    regNumber: "BT20CS045",
    email: "sarah.j@university.edu",
    position: "President",
    motto: "Innovate, Integrate, Inspire",
    manifesto: [
      "Implement digital student ID system for seamless campus access",
      "Create 24/7 study spaces with improved Wi-Fi and facilities",
      "Launch comprehensive mental health awareness and support program",
      "Establish student entrepreneurship incubation center",
      "Improve transparency in student council fund allocation"
    ],
    previousRoles: [
      "Class Representative (2nd Year)",
      "Technical Club Secretary",
      "Student Mentor for First Year Students"
    ],
    achievements: [
      "Dean's List 2023 & 2024", 
      "Best Project Award - Tech Fest 2024",
      "Published paper in International Conference on Computer Science"
    ],
    socialContributions: [
      "Founded Code for Community initiative to build tech solutions for local NGOs",
      "Student Mentorship Program Lead - guided 20+ freshers",
      "Organized blood donation camp that collected 150+ units"
    ],
    voteCount: 1254,
    votePercentage: "42%"
  },
  {
    id: 2,
    name: "Priya Singh",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    regNumber: "BT20CS063",
    email: "priya.s@university.edu",
    position: "President",
    motto: "For Students, By Students",
    manifesto: [
      "Establish student grievance redressal system with 48-hour response time",
      "Expand library resources and extend opening hours during exams",
      "Create more recreational spaces and facilities on campus",
      "Launch inter-college cultural and technical festival",
      "Implement sustainable campus initiatives"
    ],
    previousRoles: [
      "Cultural Committee Coordinator",
      "NSS Volunteer",
      "Department Representative"
    ],
    achievements: [
      "University Cultural Star Award 2024",
      "National Debate Competition Finalist",
      "Scholarship for Academic Excellence"
    ],
    socialContributions: [
      "Teach For Change - weekend education program for underprivileged children",
      "Environmental Conservation Club founder",
      "Organized campus-wide plastic-free initiative"
    ],
    voteCount: 982,
    votePercentage: "33%"
  },
  {
    id: 3,
    name: "Vikram Sharma",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    course: "B.Tech Electronics & Communication",
    year: "4th Year",
    regNumber: "BT19EC037",
    email: "vikram.s@university.edu",
    position: "President",
    motto: "Building Tomorrow's Leaders Today",
    manifesto: [
      "Establish alumni mentorship network for career guidance",
      "Improve sports facilities and organize inter-department tournaments",
      "Create industry partnership program for internships and placements",
      "Launch student-run campus radio station",
      "Implement feedback system for curriculum improvement"
    ],
    previousRoles: [
      "Sports Secretary",
      "Placement Committee Member",
      "Inter-College Event Coordinator"
    ],
    achievements: [
      "University Sports Medal 2023",
      "Best Student Leader Award",
      "Secured sponsorships worth ₹5 lakhs for college events"
    ],
    socialContributions: [
      "Sports coaching for children from economically weaker sections",
      "Career guidance workshops in rural schools",
      "Disaster relief volunteer during floods"
    ],
    voteCount: 745,
    votePercentage: "25%"
  },
  {
    id: 4,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
    course: "B.Tech Electronics",
    year: "4th Year",
    regNumber: "BT19EC032",
    email: "m.chen@university.edu",
    position: "Vice President",
    motto: "Building Bridges, Creating Change",
    manifesto: [
      "Establish inter-department collaboration programs for interdisciplinary projects",
      "Improve campus WiFi infrastructure in all areas including hostels",
      "Create student entrepreneurship hub with mentorship and funding opportunities",
      "Implement eco-friendly waste management system",
      "Organize more industry expert talks and workshops"
    ],
    previousRoles: [
      "Cultural Committee Head",
      "Department Student Representative",
      "IEEE Student Branch Executive"
    ],
    achievements: [
      "University Innovation Fellow",
      "National Robotics Competition Winner",
      "Research paper publication in IEEE conference"
    ],
    socialContributions: [
      "Weekend Teaching Program for underprivileged students - 2 years running",
      "E-waste Management Campaign Leader",
      "Technical skill workshops for rural school teachers"
    ],
    voteCount: 1053,
    votePercentage: "35%"
  }
]

// Expanded voters data with more realistic entries
const votersData = [
  {
    id: 1,
    name: "Alice Smith",
    regNumber: "BT21CS001",
    course: "B.Tech Computer Science",
    year: "2nd Year",
    voted: true,
    votedAt: "2025-05-20T09:15:22Z"
  },
  {
    id: 2,
    name: "Bob Johnson",
    regNumber: "BT20EC015",
    course: "B.Tech Electronics",
    year: "3rd Year",
    voted: false
  },
  {
    id: 3,
    name: "Charlie Brown",
    regNumber: "BT22ME030",
    course: "B.Tech Mechanical",
    year: "1st Year",
    voted: true,
    votedAt: "2025-05-20T10:45:11Z"
  },
  {
    id: 4,
    name: "Diana Lee",
    regNumber: "BT19CV022",
    course: "B.Tech Civil",
    year: "4th Year",
    voted: true,
    votedAt: "2025-05-20T08:30:45Z"
  },
  {
    id: 5,
    name: "Ethan Davis",
    regNumber: "BT21EE011",
    course: "B.Tech Electrical",
    year: "2nd Year",
    voted: false
  },
  {
    id: 6,
    name: "Fiona Wilson",
    regNumber: "BT20CS078",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    voted: true,
    votedAt: "2025-05-20T11:22:33Z"
  },
  {
    id: 7,
    name: "George Miller",
    regNumber: "BT22CH045",
    course: "B.Tech Chemical",
    year: "1st Year",
    voted: false
  },
  {
    id: 8,
    name: "Hannah Garcia",
    regNumber: "BT19ME062",
    course: "B.Tech Mechanical",
    year: "4th Year",
    voted: true,
    votedAt: "2025-05-20T14:05:17Z"
  },
  {
    id: 9,
    name: "Ian Parker",
    regNumber: "BT21CV033",
    course: "B.Tech Civil",
    year: "2nd Year",
    voted: true,
    votedAt: "2025-05-20T15:30:28Z"
  },
  {
    id: 10,
    name: "Julia Kim",
    regNumber: "BT20BT019",
    course: "B.Tech Biotechnology",
    year: "3rd Year",
    voted: false
  },
  {
    id: 11,
    name: "Kevin Patel",
    regNumber: "BT22CS089",
    course: "B.Tech Computer Science",
    year: "1st Year",
    voted: true,
    votedAt: "2025-05-20T12:12:54Z"
  },
  {
    id: 12,
    name: "Linda Martinez",
    regNumber: "BT19EC041",
    course: "B.Tech Electronics",
    year: "4th Year",
    voted: true,
    votedAt: "2025-05-20T10:08:39Z"
  }
]

// Election statistics for visualization
const electionStats = {
  totalRegisteredVoters: 4250,
  totalVotesCast: 2876,
  voterTurnout: 67.7,
  votingTrends: [
    { hour: "8 AM", votes: 342 },
    { hour: "9 AM", votes: 518 },
    { hour: "10 AM", votes: 476 },
    { hour: "11 AM", votes: 385 },
    { hour: "12 PM", votes: 290 },
    { hour: "1 PM", votes: 225 },
    { hour: "2 PM", votes: 198 },
    { hour: "3 PM", votes: 156 },
    { hour: "4 PM", votes: 187 },
    { hour: "5 PM", votes: 99 }
  ],
  departmentWiseTurnout: [
    { department: "Computer Science", turnout: 76.2 },
    { department: "Electronics", turnout: 72.5 },
    { department: "Mechanical", turnout: 68.9 },
    { department: "Civil", turnout: 65.3 },
    { department: "Electrical", turnout: 70.1 },
    { department: "Chemical", turnout: 63.7 },
    { department: "Biotechnology", turnout: 59.8 }
  ],
  yearWiseTurnout: [
    { year: "1st Year", turnout: 72.3 },
    { year: "2nd Year", turnout: 68.5 },
    { year: "3rd Year", turnout: 75.2 },
    { year: "4th Year", turnout: 60.8 }
  ]
}

export default function ElectionDashboard() {
  const [voters, setVoters] = useState([])
  const [viewType, setViewType] = useState("table")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("")
  const [showYearSelect, setShowYearSelect] = useState(false)
  const [showPositionSelect, setShowPositionSelect] = useState(false)

  const selectRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user")
      setVoters(response.data.users)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  const handleSelectYearClick = () => {
    setShowYearSelect(!showYearSelect)
  }

  const handleSelectPositionClick = () => {
    setShowPositionSelect(!showPositionSelect)
  }

  const handleRegisterCandidate = (e) => {
    e.preventDefault()
    console.log("Candidate Registered", { selectedYear, selectedPosition })
  }

  const handleCastVote = () => {
    console.log("Vote cast")
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showYearSelect &&
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setShowYearSelect(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showYearSelect])

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="mx-auto max-w-7xl space-y-8">
        <Card className="bg-primary">
          <CardHeader className="space-y-1 text-white">
            <CardTitle className="text-2xl font-bold">
              SRC/NUGS 2024 ELECTIONS
            </CardTitle>
            <p className="text-primary-foreground/80">
              17,000 registered voters
            </p>
          </CardHeader>
        </Card>

        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Register Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh] ">
              <DialogHeader>
                <DialogTitle>Register Candidate</DialogTitle>
                <DialogDescription>
                  Enter the candidate's details here. Click submit when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRegisterCandidate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photograph</Label>
                  <Input id="photo" type="file" accept="image/*" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <div ref={selectRef}>
                      <Select onValueChange={(e) => setCategory(e)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Year" />{" "}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="1st Year">First Year</SelectItem>
                            <SelectItem value="2nd year">
                              Second Year
                            </SelectItem>
                            <SelectItem value="3rd year">Third Year</SelectItem>
                            <SelectItem value="4th year">B.Tech</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input id="regNumber" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position Contesting For</Label>
                  <div ref={selectRef}>
                    <Select
                      onValueChange={(value) => {
                        setSelectedPosition(value)
                        setShowPositionSelect(false) // Dropdown close ho jayega
                      }}
                    >
                      <SelectTrigger
                        id="position"
                        onClick={() =>
                          setShowPositionSelect(!showPositionSelect)
                        }
                      >
                        <SelectValue>
                          {selectedPosition || "Select position"}
                        </SelectValue>
                      </SelectTrigger>
                      {showPositionSelect && (
                        <SelectContent>
                          <SelectItem value="1">
                            Girls Representative
                          </SelectItem>
                          <SelectItem value="2">Cultural Secretary</SelectItem>
                          <SelectItem value="3">Technical Secretary</SelectItem>
                          <SelectItem value="4">Sports Secretary</SelectItem>
                          <SelectItem value="5">Boys Representative</SelectItem>
                        </SelectContent>
                      )}
                    </Select>
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button onClick={handleCastVote}>
            <Check className="mr-2 h-4 w-4" />
            Cast Vote
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Votes Cast
              </CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(voters) ? `${voters.filter(voter => voter.filer === true).length}/${voters.length}` : "Invalid input"}</div>              <p className="text-xs text-muted-foreground">
                collected last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ongoing Positions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                positions being voted
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Time Remaining
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">02:15:45</div>
              <p className="text-xs text-muted-foreground">until polls close</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Elections */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingElections.map((election) => (
                <div
                  key={election.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-semibold">{election.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Date: {election.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{election.timeLeft}</div>
                    <p className="text-xs text-muted-foreground">Time Left</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="voters">Voters List</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="flex justify-end space-x-2 mb-4">
                  <Button
                    variant={viewType === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("table")}
                  >
                    <ListFilter className="h-4 w-4 mr-2" />
                    Table
                  </Button>
                  <Button
                    variant={viewType === "graph" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("graph")}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Graph
                  </Button>
                </div>

                {viewType === "table" ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead className="text-right">Votes</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.map((candidate) => (
                        <TableRow key={candidate.name}>
                          <TableCell className="font-medium">
                            {candidate.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {candidate.votes}
                          </TableCell>
                          <TableCell className="text-right">
                            {candidate.percentage}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="votes" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </TabsContent>

              {/* Candidates Tab */}
              <TabsContent value="candidates">
                <div className="space-y-6">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="pt-6">
                        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                          <div className="space-y-4">
                            <Avatar className="h-40 w-40">
                              <AvatarImage
                                src={candidate.photo}
                                alt={candidate.name}
                              />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">
                                {candidate.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {candidate.position}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Accordion type="single" collapsible>
                              <AccordionItem value="details">
                                <AccordionTrigger>
                                  Personal Details
                                </AccordionTrigger>
                                <AccordionContent>
                                  <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div>
                                      <dt className="font-medium">
                                        Course & Year
                                      </dt>
                                      <dd className="text-muted-foreground">
                                        {candidate.course}, {candidate.year}
                                      </dd>
                                    </div>
                                    <div>
                                      <dt className="font-medium">
                                        Registration Number
                                      </dt>
                                      <dd className="text-muted-foreground">
                                        {candidate.regNumber}
                                      </dd>
                                    </div>
                                    <div>
                                      <dt className="font-medium">Email</dt>
                                      <dd className="text-muted-foreground">
                                        {candidate.email}
                                      </dd>
                                    </div>
                                  </dl>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="manifesto">
                                <AccordionTrigger>
                                  Campaign Motto & Manifesto
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium">Motto</h4>
                                      <p className="text-muted-foreground">
                                        {candidate.motto}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium">
                                        Proposed Plans
                                      </h4>
                                      <ul className="list-disc list-inside text-muted-foreground">
                                        {candidate.manifesto.map((item, i) => (
                                          <li key={i}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="experience">
                                <AccordionTrigger>
                                  Experience & Achievements
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium">
                                        Previous Leadership Roles
                                      </h4>
                                      <ul className="list-disc list-inside text-muted-foreground">
                                        {candidate.previousRoles.map(
                                          (role, i) => (
                                            <li key={i}>{role}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-medium">
                                        Achievements
                                      </h4>
                                      <ul className="list-disc list-inside text-muted-foreground">
                                        {candidate.achievements.map(
                                          (achievement, i) => (
                                            <li key={i}>{achievement}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="contributions">
                                <AccordionTrigger>
                                  Social Contributions
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="list-disc list-inside text-muted-foreground">
                                    {candidate.socialContributions.map(
                                      (contribution, i) => (
                                        <li key={i}>{contribution}</li>
                                      )
                                    )}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Voters List Tab */}
              <TabsContent value="voters">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search voters..." />
                    <Button size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Registration Number</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Voted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {voters.map((voter) => (
                        <TableRow key={voter.id}>
                          <TableCell className="font-medium">
                            {voter.name}
                          </TableCell>
                          <TableCell>{voter.email ? voter.email.substring(0, voter.email.indexOf('@')) : "N/A"}</TableCell>
                          <TableCell>{voter.department}</TableCell>
                          <TableCell>{voter.role}</TableCell>
                          <TableCell>{voter.voted ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
