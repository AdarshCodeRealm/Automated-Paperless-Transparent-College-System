// 2. Automated Health & Leave Notifi cations
    // ● If a student is reported sick by the college doctor, an automatic email is sent to the respective class coordinator.
    // ● If a student leaves campus, an automated email is sent to their parents for safety tracking.

    import {Student,HealthRecord,LeaveRecord,Notifications} from '../models/healthandleave.models.js'

//student createion
    const getStudents = async(req,res)=>{
        try {
            const students = await Student.find();
            res.json(students);
        } catch (error) {
            console.log("failed to get student",error);
            res.status(500).json({messgae:"server error"});
        }
        
    };

    const getStudentbyId = async(req,res) => {
        try {
            const student  = await Student.findByid(req.params.id);
            if(!student){
                return res.status(404).json({message:"student not found"});
            }
        } catch (error) {
            console.log("failed to get student",error);
            res.status(500).json({message:"server error"});
        }
    };

    const createstudent = async(req,res)=> {
        try {
            const newstudent = new Student(req.body);
            const saved = await newstudent.save();
            res.status(201).json(saved);
        } catch (error) {
            console.log("failed to create student",error);
            res.status(500).json({message:"server error"});
        }
    };
//health
    const createHealthRecord = async(req,res)=>{
        try {
            const newrecord = new HealthRecord(req.body);
            const saved = await newrecord.save();
            res.status(201).json(saved);
        } catch (error) {
            console.log("failed to create health record",error);
            res.status(500).json({message:"Server error"});
        }
    };

    const gethealthrecordbystudentid = async(req,res) =>{
        try {
            const studentid = req.params.id;
            const healthrecords = await HealthRecord.find({studentId:studentid}).populate('student');
            res.json(healthrecords);
        } catch (error) {
            console.log("Error creating health record",error);
            res.status(500).json({message:"Server error"});
        }
    };
//leave
    const createLeaveRecord = async(req,res)=>{
        try {
            const newrecord = new LeaveRecord(req.body);
            const saved = await newrecord.save();
            res.status(201).json(saved);
        } catch (error) {
            console.log("failed to create leave record",error);
            res.status(500).json({message:"Server error"});
        }
    };

    const getLeaverecordbystudentid = async(req,res) =>{
        try {
            const studentid = req.params.id;
            const leaveRecords = await LeaveRecord.find({studentId:studentid}).populate('student');
            res.json(leaveRecords);
        } catch (error) {
            console.log("Error creating leave record",error);
            res.status(500).json({message:"Server error"});
        }
    };
//notfication
    const getNotifications = async (req, res) => {
        try {
            const notifications = await Notifications.find().populate('student');
            res.json(notifications);
        } catch (error) {
            console.error("Error getting notifications:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };

    const reportSickRoute = async (req, res) => { 
        try {
            const { studentId, reportedBy, diagnosis } = req.body;
            await reportSick(studentId, reportedBy, diagnosis); 
            res.json({ message: "Sick report submitted" }); 
        } catch (error) {
            console.error("Error in reportSickRoute:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };
    
    const studentLeavesCampusRoute = async (req, res) => {
        try {
            const { studentId } = req.body;
            await studentLeavesCampus(studentId);
            res.json({ message: "Leave notification sent"});
        } catch (error) {
            console.error("Error in studentLeavesCampusRoute", error);
            res.status(500).json({ message: "Server Error"});
        }
    };

    export  {getStudents,getStudentbyId,createstudent,createHealthRecord,gethealthrecordbystudentid,createLeaveRecord,getLeaverecordbystudentid,getNotifications,reportSickRoute,studentLeavesCampusRoute}