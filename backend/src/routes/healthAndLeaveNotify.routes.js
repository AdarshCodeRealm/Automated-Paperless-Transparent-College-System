import express from 'express';
import { Router } from 'express';
import {getStudents,getStudentbyId,createstudent,createHealthRecord,gethealthrecordbystudentid,createLeaveRecord,getLeaverecordbystudentid} from "../controllers/healthAndLeaveNotify.controller.js"
import sendEmail from "../middlewares/sendmail.middleware.js" 
import reportSick from '../middlewares/reportsick.middleware.js';
import studentLeavesCampus from '../middlewares/studentleavecampus.middleware.js';

const router = Router();

// fetching  students routes
router.get('/students',getStudents);
router.get('/student/:id',getStudentbyId);
router.post('/student/add',createstudent);
router.post('/health-records',createHealthRecord);//Health records routes
router.get('/health-records/student/:studentId',gethealthrecordbystudentid);//get health records
router.post('/leave-records',createLeaveRecord);
router.get('/leave-records/student/:studentId',getLeaverecordbystudentid);//get leave records
router.get('/notifications',sendEmail);//notification routes
router.put('/notifications/:id/sent', sendEmail);
router.post('/report-sick', reportSick);// Automated Notification Trigger Routes (Crucial!)
router.post('/student-leaves', studentLeavesCampus);

export default router;