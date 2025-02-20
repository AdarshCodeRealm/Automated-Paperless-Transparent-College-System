import { Router } from 'express';
import {eventController,budgetApprovalController,sponsorshipController,userController,notificationController} from "../controllers/applicationAndApprovalSystem.controller.js"
const router = Router();

// Event Routes
router.post('/events',  eventController.createEvent);//Authentication middleware required here for authorization
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id',  eventController.updateEvent);//Authentication middleware required here for authorization
router.delete('/events/:id',  eventController.deleteEvent);//Authentication middleware required here for authorization
router.post('/events/:id/comments',  eventController.addComment);//Authentication middleware required here for authorization

// Budget Approval Routes
router.post('/budgetApprovals',  budgetApprovalController.createBudgetApproval);//Authentication middleware required here for authorization
router.get('/budgetApprovals/:id', budgetApprovalController.getBudgetApprovalById);
router.put('/budgetApprovals/:id', budgetApprovalController.updateBudgetApproval);//Authentication middleware required here for authorization


// Sponsorship Routes
router.post('/sponsorships', sponsorshipController.createSponsorship);//Authentication middleware required here for authorization
router.get('/sponsorships/:id', sponsorshipController.getSponsorshipById);
router.put('/sponsorships/:id',  sponsorshipController.updateSponsorship);//Authentication middleware required here for authorization


// User Routes
router.get('/users/:id', userController.getUserById);  


// Notification Routes
router.get('/notifications',  notificationController.getNotificationsForUser);//Authentication middleware required here for authorization
router.put('/notifications/:id/read',  notificationController.markNotificationAsRead);//Authentication middleware required here for authorization

export default router