import { Router } from 'express';
import {bookingController,facilityController,userController} from "../controllers/facilityBooking.controller.js"
const router = Router();

// Booking Routes
router.post('/bookings',  bookingController.createBooking); // Requires authentication
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.put('/bookings/:id',  bookingController.updateBooking); // Requires authentication
router.delete('/bookings/:id',  bookingController.deleteBooking); // Requires authentication
router.put('/bookings/:id/approve',  bookingController.approveBooking); // Requires authentication (and probably admin/faculty role check)
router.put('/bookings/:id/reject',  bookingController.rejectBooking); // Requires authentication (and probably admin/faculty role check)



// Facility Routes
router.post('/facilities',  facilityController.createFacility); // Requires authentication (and probably admin role check)
router.get('/facilities', facilityController.getAllFacilities);
router.get('/facilities/:id', facilityController.getFacilityById);
router.put('/facilities/:id',  facilityController.updateFacility); // Requires authentication (and probably admin role check)
router.delete('/facilities/:id',  facilityController.deleteFacility); // Requires authentication (and probably admin role check)

// User Routes
router.post('/users/register', userController.createUser); // Registration (no authentication needed here)
router.get('/users',  userController.getAllUsers); // Requires authentication (and probably admin role check)
router.get('/users/:id',  userController.getUserById); // Requires authentication
router.put('/users/:id',  userController.updateUser); // Requires authentication
router.delete('/users/:id',  userController.deleteUser); // Requires authentication (and probably admin role check)

export default router;