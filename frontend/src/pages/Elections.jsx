"use client"

import { useState, useRef, useEffect } from "react"
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

const mockData = [
  { name: "John McCarthy One", votes: 75, percentage: "30%" },
  { name: "Jane McCarthy Two", votes: 50, percentage: "20%" },
  { name: "Sam McCarthy Three", votes: 125, percentage: "50%" },
]

const upcomingElections = [
  {
    id: 1,
    title: "STUDENT COUNCIL ELECTION",
    date: "2025-03-15",
    timeLeft: "23:15:45",
  },
  {
    id: 2,
    title: "DEPARTMENT REP ELECTION",
    date: "2025-03-20",
    timeLeft: "120:45:30",
  },
]

// Updated ongoingElections with endTime instead of endDate
const ongoingElections = [
  {
    id: 1,
    title: "STUDENT COUNCIL PRESIDENT ELECTION",
    endTime: new Date(Date.now() + 172800000), // 48 hours from now
    timeLeft: "48:00:00",
  },
  {
    id: 2,
    title: "CULTURAL SECRETARY ELECTION",
    endTime: new Date(Date.now() + 259200000), // 72 hours from now
    timeLeft: "72:00:00",
  },
]

const candidateData = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "/placeholder.svg", // Replace with actual image path
    course: "B.Tech Computer Science",
    year: "3rd Year",
    regNumber: "BT20CS045",
    email: "sarah.j@university.edu",
    position: "President",
    motto: "Innovate, Integrate, Inspire",
    manifesto: [
      "Implement digital student ID system",
      "Create 24/7 study spaces",
      "Launch mental health awareness program",
    ],
    previousRoles: [
      "Class Representative (2nd Year)",
      "Technical Club Secretary",
    ],
    achievements: ["Dean's List 2023", "Best Project Award - Tech Fest 2024"],
    socialContributions: [
      "Founded Code for Community initiative",
      "Student Mentorship Program Lead",
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "/placeholder.svg", // Replace with actual image path
    course: "B.Tech Electronics",
    year: "4th Year",
    regNumber: "BT19EC032",
    email: "m.chen@university.edu",
    position: "Vice President",
    motto: "Building Bridges, Creating Change",
    manifesto: [
      "Establish inter-department collaboration programs",
      "Improve campus WiFi infrastructure",
      "Create student entrepreneurship hub",
    ],
    previousRoles: [
      "Cultural Committee Head",
      "Department Student Representative",
    ],
    achievements: [
      "University Innovation Fellow",
      "National Robotics Competition Winner",
    ],
    socialContributions: [
      "Weekend Teaching Program for underprivileged students",
      "E-waste Management Campaign Leader",
    ],
  },
]

// Updated voters with gender
const voters = [
  {
    id: 1,
    name: "Alice Smith",
    regNumber: "BT21CS001",
    course: "B.Tech Computer Science",
    year: "2nd Year",
    voted: [],
    gender: "Female",
  },
  {
    id: 2,
    name: "Bob Johnson",
    regNumber: "BT20EC015",
    course: "B.Tech Electronics",
    year: "3rd Year",
    voted: [],
    gender: "Male",
  },
  {
    id: 3,
    name: "Charlie Brown",
    regNumber: "BT22ME030",
    course: "B.Tech Mechanical",
    year: "1st Year",
    voted: [],
    gender: "Male",
  },
  {
    id: 4,
    name: "Diana Lee",
    regNumber: "BT19CV022",
    course: "B.Tech Civil",
    year: "4th Year",
    voted: [],
    gender: "Female",
  },
  {
    id: 5,
    name: "Ethan Davis",
    regNumber: "BT21EE011",
    course: "B.Tech Electrical",
    year: "2nd Year",
    voted: [],
    gender: "Male",
  },
]

export default function ElectionDashboard() {
  const [date, setDate] = useState(new Date())
  const [viewType, setViewType] = useState("table")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("")
  const [showYearSelect, setShowYearSelect] = useState(false)
  const [showPositionSelect, setShowPositionSelect] = useState(false)
  const selectRef = useRef(null)
  const [category, setCategory] = useState("")

  const [selectedElection, setSelectedElection] = useState(null)
  const [ongoingElectionsState, setOngoingElectionsState] =
    useState(ongoingElections)
  const [votersState, setVotersState] = useState(voters)

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

  const handleCastVote = (electionId, voterId) => {
    setVotersState((prevVoters) =>
      prevVoters.map((voter) =>
        voter.id === voterId
          ? { ...voter, voted: [...voter.voted, electionId] }
          : voter
      )
    )
  }

  const handleElectionClick = (election) => {
    setSelectedElection(election)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Registered Candidate Data:", candidateData);
    alert("Candidate registered successfully!");
  };

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setOngoingElectionsState((prevElections) =>
        prevElections.map((election) => {
          const now = new Date()
          const timeLeft = election.endTime - now
          if (timeLeft <= 0) {
            return { ...election, timeLeft: "00:00:00" }
          }
          const hours = Math.floor(timeLeft / (1000 * 60 * 60))
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          )
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
          return {
            ...election,
            timeLeft: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          }
        })
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const getVoterLists = () => {
    const boysVoted = votersState.filter(
      (voter) =>
        voter.gender === "Male" && voter.voted.includes(selectedElection.id)
    )
    const girlsVoted = votersState.filter(
      (voter) =>
        voter.gender === "Female" && voter.voted.includes(selectedElection.id)
    )
    const boysNotVoted = votersState.filter(
      (voter) =>
        voter.gender === "Male" && !voter.voted.includes(selectedElection.id)
    )
    const girlsNotVoted = votersState.filter(
      (voter) =>
        voter.gender === "Female" && !voter.voted.includes(selectedElection.id)
    )

    return { boysVoted, girlsVoted, boysNotVoted, girlsNotVoted }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 rounded-3xl">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-2xl font-semibold">Student Elections</h1>
        </div>
      </header>
      <br />
      <div className="mx-auto max-w-7xl space-y-8">
        <Card className="bg-primary">
          <CardHeader className="space-y-1 text-white">
            <CardTitle className="text-2xl font-bold">
              SGGS 2025 ELECTIONS
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
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register Candidate</DialogTitle>
                <DialogDescription>
                  Enter the candidate's details here. Click submit when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={candidateData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photograph</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      value={candidateData.course}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      onValueChange={(value) =>
                        setCandidateData({ ...candidateData, year: value })
                      }
                      required
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    value={candidateData.regNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={candidateData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position Contesting For</Label>
                  <Select
                    onValueChange={(value) =>
                      setCandidateData({ ...candidateData, position: value })
                    }
                    required
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="president">President</SelectItem>
                      <SelectItem value="vicePresident">
                        Vice President
                      </SelectItem>
                      <SelectItem value="generalSecretary">
                        General Secretary
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motto">Campaign Motto</Label>
                  <Input
                    id="motto"
                    value={candidateData.motto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manifesto">
                    Proposed Plans / Agenda / Manifesto
                  </Label>
                  <Textarea
                    id="manifesto"
                    value={candidateData.manifesto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousRoles">
                    Previous Leadership Roles
                  </Label>
                  <Textarea
                    id="previousRoles"
                    value={candidateData.previousRoles}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievements">
                    Academic & Extracurricular Achievements
                  </Label>
                  <Textarea
                    id="achievements"
                    value={candidateData.achievements}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialContributions">
                    Social Contributions
                  </Label>
                  <Textarea
                    id="socialContributions"
                    value={candidateData.socialContributions}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
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
              <div className="text-2xl font-bold">
                {votersState.reduce(
                  (acc, voter) => acc + voter.voted.length,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                across all elections
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ongoing Elections
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ongoingElectionsState.length}
              </div>
              <p className="text-xs text-muted-foreground">
                elections in progress
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
              <div className="text-2xl font-bold">
                {ongoingElectionsState.length > 0
                  ? ongoingElectionsState[0].timeLeft
                  : "00:00:00"}
              </div>
              <p className="text-xs text-muted-foreground">
                until next election ends
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ongoing Elections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ongoing Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ongoingElectionsState.map((election) => (
                <div
                  key={election.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleElectionClick(election)}
                >
                  <div>
                    <h3 className="font-semibold">{election.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ends: {election.endTime.toLocaleString()}
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

        {/* Upcoming Elections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ongoingElectionsState.map((election) => (
                <div
                  key={election.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleElectionClick(election)}
                >
                  <div>
                    <h3 className="font-semibold">{election.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Date: {election.endTime.toLocaleString()}
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
            <CardTitle>
              {selectedElection
                ? `Election Results: ${selectedElection.title}`
                : "Election Results"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedElection ? (
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
                          <TableHead className="text-right">
                            Percentage
                          </TableHead>
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
                                          {candidate.manifesto.map(
                                            (item, i) => (
                                              <li key={i}>{item}</li>
                                            )
                                          )}
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
                    <Tabs>
                      <TabsList>
                        <TabsTrigger value="all">All Voters</TabsTrigger>
                        <TabsTrigger value="voted">Voted</TabsTrigger>
                        <TabsTrigger value="not-voted">Not Voted</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all">
                        <VoterTable
                          voters={votersState}
                          electionId={selectedElection.id}
                          handleCastVote={handleCastVote}
                        />
                      </TabsContent>
                      <TabsContent value="voted">
                        <Tabs>
                          <TabsList>
                            <TabsTrigger value="boys-voted">Boys</TabsTrigger>
                            <TabsTrigger value="girls-voted">Girls</TabsTrigger>
                          </TabsList>
                          <TabsContent value="boys-voted">
                            <VoterTable
                              voters={getVoterLists().boysVoted}
                              electionId={selectedElection.id}
                              handleCastVote={handleCastVote}
                            />
                          </TabsContent>
                          <TabsContent value="girls-voted">
                            <VoterTable
                              voters={getVoterLists().girlsVoted}
                              electionId={selectedElection.id}
                              handleCastVote={handleCastVote}
                            />
                          </TabsContent>
                        </Tabs>
                      </TabsContent>
                      <TabsContent value="not-voted">
                        <Tabs>
                          <TabsList>
                            <TabsTrigger value="boys-not-voted">
                              Boys
                            </TabsTrigger>
                            <TabsTrigger value="girls-not-voted">
                              Girls
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="boys-not-voted">
                            <VoterTable
                              voters={getVoterLists().boysNotVoted}
                              electionId={selectedElection.id}
                              handleCastVote={handleCastVote}
                            />
                          </TabsContent>
                          <TabsContent value="girls-not-voted">
                            <VoterTable
                              voters={getVoterLists().girlsNotVoted}
                              electionId={selectedElection.id}
                              handleCastVote={handleCastVote}
                            />
                          </TabsContent>
                        </Tabs>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <p>Select an ongoing election to view results.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function VoterTable({ voters, electionId, handleCastVote }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Registration Number</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Voted</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voters.map((voter) => (
          <TableRow key={voter.id}>
            <TableCell className="font-medium">{voter.name}</TableCell>
            <TableCell>{voter.regNumber}</TableCell>
            <TableCell>{voter.course}</TableCell>
            <TableCell>{voter.year}</TableCell>
            <TableCell>{voter.gender}</TableCell>
            <TableCell>
              {voter.voted.includes(electionId) ? "Yes" : "No"}
            </TableCell>
            <TableCell>
              {!voter.voted.includes(electionId) && (
                <Button onClick={() => handleCastVote(electionId, voter.id)}>
                  Cast Vote
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
