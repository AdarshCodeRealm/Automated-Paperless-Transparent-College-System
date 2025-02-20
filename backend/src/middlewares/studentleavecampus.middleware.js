import {Student,Notification} from "../models/healthandleave.models.js"

async function studentLeavesCampus(studentId) {
    try {
        const student = await Student.findOne({ studentId });
        if (!student) {
            throw new Error("Student not found");
        }

        const notification = new Notification({
            type: 'leave',
            student: student._id,
            recipient: student.parentsEmail,
            message: `${student.name} has left campus.`,
        });
        await notification.save();
        await sendEmail(notification.recipient, notification.message);
        notification.sent = true;
        await notification.save();
    } catch (error) {
        console.error("Error in student leave:", error);
        throw error;  // Re-throw the error
    }
}

export default studentLeavesCampus;