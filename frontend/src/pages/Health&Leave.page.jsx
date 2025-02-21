    import { useState } from "react";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Label } from "@/components/ui/label";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Send } from "lucide-react";
import axios from "axios";

    export default function StudentNotification() {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [isSick, setIsSick] = useState(false);
    const [leftCampus, setLeftCampus] = useState(false);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
    const reason = isSick ? "Reported Sick" : leftCampus ? "Left Campus" : "";

    if (!studentName || !email || !reason) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/healthAndLeaveNotify/report-sick", {
        studentName,
        email,
        reason,
        });

        if (response.status === 200) {
        alert("Email sent successfully!");
        } else {
        throw new Error("Failed to send email.");
        }
    } catch (error) {
        console.error(error);
        alert("Error sending email. Check console.");
    }

        setStudentName("");
        setEmail("");
        setIsSick(false);
        setLeftCampus(false);
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
            <CardTitle>Student Notification Form</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input id="name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox id="sick" checked={isSick} onCheckedChange={setIsSick} />
                <Label htmlFor="sick">Reported Sick</Label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox id="leftCampus" checked={leftCampus} onCheckedChange={setLeftCampus} />
                <Label htmlFor="leftCampus">Left Campus</Label>
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                Send Notification
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
