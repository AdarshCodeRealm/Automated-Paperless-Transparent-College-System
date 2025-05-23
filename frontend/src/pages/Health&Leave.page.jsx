import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, AlertCircle, CheckCircle, List, Pill, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

// Dummy data for previous reports
const dummyReports = [
  {
    id: 1,
    studentName: "Rajesh Kumar",
    email: "rajesh.kumar@university.edu",
    reason: "Reported Sick",
    details: "Fever and cold",
    status: "Approved",
    dateSubmitted: "2025-05-15T09:30:00",
    duration: "3 days",
    documentProvided: true
  },
  {
    id: 2,
    studentName: "Priya Sharma",
    email: "priya.sharma@university.edu",
    reason: "Left Campus",
    details: "Family emergency",
    status: "Pending",
    dateSubmitted: "2025-05-18T14:15:00",
    duration: "2 days",
    documentProvided: false
  },
  {
    id: 3,
    studentName: "Amit Singh",
    email: "amit.singh@university.edu",
    reason: "Reported Sick",
    details: "Migraine",
    status: "Approved",
    dateSubmitted: "2025-05-10T11:20:00",
    duration: "1 day",
    documentProvided: true
  },
  {
    id: 4,
    studentName: "Neha Patel",
    email: "neha.patel@university.edu",
    reason: "Left Campus",
    details: "Academic conference",
    status: "Rejected",
    dateSubmitted: "2025-05-05T16:45:00",
    duration: "5 days",
    documentProvided: true
  },
  {
    id: 5,
    studentName: "Vikram Malhotra",
    email: "vikram.malhotra@university.edu",
    reason: "Reported Sick",
    details: "Stomach infection",
    status: "Approved",
    dateSubmitted: "2025-05-20T08:10:00",
    duration: "2 days",
    documentProvided: true
  }
];

// Dummy data for health advisories
const healthAdvisories = [
  {
    id: 1,
    title: "Seasonal Flu Prevention",
    content: "There has been an increase in seasonal flu cases. Students are advised to maintain proper hygiene, get adequate rest, and stay hydrated.",
    date: "2025-05-19",
    severity: "medium"
  },
  {
    id: 2,
    title: "COVID-19 Booster Clinic",
    content: "A COVID-19 booster vaccination clinic will be held on campus from May 25-27. All students are encouraged to get their boosters if eligible.",
    date: "2025-05-18",
    severity: "high"
  },
  {
    id: 3,
    title: "Mental Health Awareness Week",
    content: "Next week is Mental Health Awareness Week. Various workshops and counseling sessions will be available for all students.",
    date: "2025-05-15",
    severity: "low"
  }
];

export default function StudentNotification() {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [duration, setDuration] = useState("1 day");
    const [documentProvided, setDocumentProvided] = useState(false);
    const [isSick, setIsSick] = useState(false);
    const [leftCampus, setLeftCampus] = useState(false);
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Simulate loading data
    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setReports(dummyReports);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reasonText = isSick ? "Reported Sick" : leftCampus ? "Left Campus" : reason;

        if (!studentName || !email || !reasonText) {
            alert("Please fill all required fields!");
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            setTimeout(() => {
                // Add new report to the list
                const newReport = {
                    id: reports.length + 1,
                    studentName,
                    email,
                    reason: reasonText,
                    details,
                    status: "Pending",
                    dateSubmitted: new Date().toISOString(),
                    duration,
                    documentProvided
                };
                
                setReports([newReport, ...reports]);
                setSuccessMessage("Notification sent successfully!");
                
                // Reset form
                setStudentName("");
                setEmail("");
                setReason("");
                setDetails("");
                setDuration("1 day");
                setDocumentProvided(false);
                setIsSick(false);
                setLeftCampus(false);
                
                setIsLoading(false);
                
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            }, 1500);
            
            /*
            // Uncomment this code when connecting to the real backend
            const response = await axios.post("http://localhost:5000/healthAndLeaveNotify/report-sick", {
                studentName,
                email,
                reason: reasonText,
                details,
                duration,
                documentProvided
            });

            if (response.status === 200) {
                setSuccessMessage("Notification sent successfully!");
                // Reset form fields
            } else {
                throw new Error("Failed to send notification.");
            }
            */
            
        } catch (error) {
            console.error(error);
            alert("Error sending notification. Please try again.");
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "text-green-600";
            case "rejected":
                return "text-red-600";
            default:
                return "text-amber-600";
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-amber-100 text-amber-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Health & Leave Management</h1>
                
                <Tabs defaultValue="report" className="space-y-6">
                    <TabsList className="grid grid-cols-3 w-full max-w-md mb-2">
                        <TabsTrigger value="report">Report</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="advisories">Health Advisories</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="report" className="space-y-4">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Student Notification Form</CardTitle>
                                <CardDescription>Submit health issues or campus leave notifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Student Name <span className="text-red-500">*</span></Label>
                                            <Input 
                                                id="name" 
                                                value={studentName} 
                                                onChange={(e) => setStudentName(e.target.value)} 
                                                required 
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Student Email <span className="text-red-500">*</span></Label>
                                            <Input 
                                                id="email" 
                                                type="email" 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)} 
                                                required 
                                                placeholder="your.email@university.edu"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Notification Type <span className="text-red-500">*</span></Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                                <Checkbox 
                                                    id="sick" 
                                                    checked={isSick} 
                                                    onCheckedChange={(checked) => {
                                                        setIsSick(checked);
                                                        if (checked) setLeftCampus(false);
                                                    }} 
                                                />
                                                <Label htmlFor="sick" className="flex items-center">
                                                    <Pill className="h-4 w-4 mr-2" />
                                                    Reported Sick
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                                <Checkbox 
                                                    id="leftCampus" 
                                                    checked={leftCampus} 
                                                    onCheckedChange={(checked) => {
                                                        setLeftCampus(checked);
                                                        if (checked) setIsSick(false);
                                                    }} 
                                                />
                                                <Label htmlFor="leftCampus" className="flex items-center">
                                                    <Home className="h-4 w-4 mr-2" />
                                                    Left Campus
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="details">Additional Details</Label>
                                        <Textarea 
                                            id="details" 
                                            value={details} 
                                            onChange={(e) => setDetails(e.target.value)} 
                                            placeholder="Please provide more information about your situation"
                                            rows={4}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Expected Duration</Label>
                                            <Select value={duration} onValueChange={setDuration}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1 day">1 day</SelectItem>
                                                    <SelectItem value="2 days">2 days</SelectItem>
                                                    <SelectItem value="3 days">3 days</SelectItem>
                                                    <SelectItem value="4 days">4 days</SelectItem>
                                                    <SelectItem value="5 days">5 days</SelectItem>
                                                    <SelectItem value="1 week">1 week</SelectItem>
                                                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="document">Supporting Document</Label>
                                            <div className="flex items-center space-x-2 h-10">
                                                <Checkbox 
                                                    id="document" 
                                                    checked={documentProvided} 
                                                    onCheckedChange={setDocumentProvided} 
                                                />
                                                <Label htmlFor="document">Document provided</Label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        type="submit" 
                                        className="w-full flex items-center justify-center gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                Send Notification
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                            {successMessage && (
                                <CardFooter className="bg-green-50 text-green-700 flex gap-2 items-center">
                                    <CheckCircle className="h-5 w-5" />
                                    {successMessage}
                                </CardFooter>
                            )}
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="history">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Report History</CardTitle>
                                <CardDescription>View all your previous notifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Reason</TableHead>
                                                    <TableHead>Duration</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Details</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {reports.length > 0 ? (
                                                    reports.map((report) => (
                                                        <TableRow key={report.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{format(new Date(report.dateSubmitted), 'dd MMM yyyy')}</div>
                                                                <div className="text-xs text-gray-500">{format(new Date(report.dateSubmitted), 'HH:mm')}</div>
                                                            </TableCell>
                                                            <TableCell>{report.reason}</TableCell>
                                                            <TableCell>{report.duration}</TableCell>
                                                            <TableCell>
                                                                <span className={getStatusColor(report.status)}>{report.status}</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="outline" size="sm">
                                                                    <List className="h-4 w-4 mr-1" /> View
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                            No reports found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="advisories">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Health Advisories</CardTitle>
                                <CardDescription>Important health information from the university</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {healthAdvisories.map(advisory => (
                                        <div key={advisory.id} className="border rounded-lg overflow-hidden">
                                            <div className={`px-4 py-3 font-medium flex justify-between items-center ${getSeverityColor(advisory.severity)}`}>
                                                <div className="flex items-center">
                                                    <AlertCircle className="h-5 w-5 mr-2" />
                                                    {advisory.title}
                                                </div>
                                                <div className="text-sm">
                                                    {advisory.date}
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white">
                                                <p>{advisory.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
