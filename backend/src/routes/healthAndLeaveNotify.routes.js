import express from 'express';
import { Router } from 'express';
import {Student,HealthRecord,LeaveRecord,Notification} from '../models/healthandleave.models.js';
// import authenticate from '../middlewares/authenticate.middleware.js';
// import reportSick from '../middlewares/reportsick.middleware.js';
// import studentLeavesCampus from '../middlewares/studentleavecampus.middleware.js';

const router = Router();

// fetching  students routes
router.get('/students',Student)
router.post('/health-records',HealthRecord);//Health records routes
router.get('/health-records/student/:studentId',HealthRecord);//get health records
router.post('/leave-records',LeaveRecord);
router.get('/leave-records/student/:studentId',LeaveRecord);//get leave records
router.get('/notifications',Notification);//notification routes
router.put('/notifications/:id/sent', Notification);
// router.post('/report-sick', reportSick);// Automated Notification Trigger Routes (Crucial!)
// router.post('/student-leaves', studentLeavesCampus);

export default router;