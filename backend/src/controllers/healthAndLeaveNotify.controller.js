// 2. Automated Health & Leave Notifi cations
    // ● If a student is reported sick by the college doctor, an automatic email is sent to the respective class coordinator.
    // ● If a student leaves campus, an automated email is sent to their parents for safety tracking.

    import {Student,HealthRecord,LeaveRecord,Notification} from '../models/healthandleave.models.js'
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
            const healthrecords = await HealthRecord.find({studentid:studentid}).populate('studentEmail');
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
            const leaveRecords = await LeaveRecord.find({studentid:studentid}).populate('studentEmail');
            res.json(leaveRecords);
        } catch (error) {
            console.log("Error creating leave record",error);
            res.status(500).json({message:"Server error"});
        }
    };
//notfication
    const getNotifications = async (req, res) => {
        try {
            const notifications = await Notification.find().populate('student');
            res.json(notifications);
        } catch (error) {
            console.error("Error getting notifications:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };

    const reportSickRoute = async (req, res) => {
        try {
            const { studentEmail, reportedBy, diagnosis } = req.body;
    
            const newHealthRecord = new HealthRecord({ studentEmail, reportedBy, diagnosis }); // Correct way to create a new document
            const savedHealthRecord = await newHealthRecord.save(); // Save the document
    
            await Notification.create({ student: savedHealthRecord._id, type: "Sick", message: `${studentEmail} reported sick with ${diagnosis}.` })
                .catch(notificationError => {
                    console.error("Error creating notification:", notificationError);
                });
    
            res.json({ message: "Sick report sent" ,savedHealthRecord});
        } catch (error) {
            console.error("Error in reportSickRoute:", error);
            res.status(500).json({ message: "Server Error", error: error.message }); // More informative error message (dev only)
        }
    };
    
    const studentLeavesCampusRoute = async (req, res) => {
        try {
            const { studentEmail, reason } = req.body;
    
            const newLeaveRecord = new LeaveRecord({ studentEmail, reason }); // Use student's _id
            const savedLeaveRecord = await newLeaveRecord.save();
    
            await Notification.create({ studentEmail: savedLeaveRecord._id, type: "Leave", message: `${studentEmail} has left campus due to ${reason}.` });
    
            res.json({ message: "Leave notification sent", savedLeaveRecord });
        } catch (error) {
            console.error("Error in studentLeavesCampusRoute:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };

    export  {getStudents,getStudentbyId,createstudent,createHealthRecord,gethealthrecordbystudentid,createLeaveRecord,getLeaverecordbystudentid,getNotifications,reportSickRoute,studentLeavesCampusRoute}