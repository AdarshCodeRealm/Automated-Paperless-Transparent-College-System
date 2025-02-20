import {Student,HealthRecord} from '../models/healthandleave.models.js'
async function reportSick(studentId, reportedBy, diagnosis) {
    try{
        const student = await Student.findOne({ studentId });
        if (!student) {
            throw new Error("Student not found")
        }
        const healthRecord = new HealthRecord({
            student: student._id,
            reportedBy,
            diagnosis,
            notes,
        });
    
        await healthRecord.save();

        const notification = new Notification({
            type: 'sick',
            student: student._id,
            recipient: student.classCoordinatorEmail,
            message: `${student.name} has been reported sick.`, 
        });

        await notification.save();
        await sendEmail(notification.recipient, notification.message); 
        notification.sent = true;
        await notification.save();


    }catch (error){
        console.error("Error reporting sick:", error)
    }

}

export default reportSick;