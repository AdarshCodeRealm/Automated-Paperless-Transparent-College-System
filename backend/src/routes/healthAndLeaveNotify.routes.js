import { Router } from 'express';
import {getStudents,getStudentbyId,createstudent,createHealthRecord,gethealthrecordbystudentid,createLeaveRecord,getLeaverecordbystudentid,getNotifications,reportSickRoute,studentLeavesCampusRoute} from "../controllers/healthAndLeaveNotify.controller.js"


const router = Router();

// fetching  students routes
router.get('/students',getStudents);
router.get('/student/:id',getStudentbyId);
router.post('/student/add',createstudent);
router.post('/health-records',createHealthRecord);//Health records routes
router.get('/health-records/student/:studentId',gethealthrecordbystudentid);//get health records
router.post('/leave-records',createLeaveRecord);
router.get('/leave-records/student/:studentId',getLeaverecordbystudentid);//get leave records
router.get('/notifications',getNotifications);//notification routes
router.put('/notifications/:id/sent', getNotifications);
router.post('/report-sick', reportSickRoute);// Automated Notification Trigger Routes (Crucial!)
router.post('/student-leaves', studentLeavesCampusRoute);

export default router;