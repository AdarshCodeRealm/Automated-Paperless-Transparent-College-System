// 3. Campus Facility Booking System
    // ● Online prior booking system for campus places (e.g., tennis court, auditorium).
    // ● Approval mechanism from relevant authorities.
    // ● Availability status visible to students and faculty.


    import {Booking,Facility,User} from "../models/facility.model.js"
    import bcrypt from "bcrypt"

    const bookingController = {
        createBooking: async(req,res)=>{
            try{
                const {facility, bookingDate, bookingStartTime, bookingEndTime, reasonForBooking} = req.body;
                const user = req.params._id;

                const booking = new Booking({
                    facility,
                    user,
                    bookingDate,
                    bookingStartTime,
                    bookingEndTime,
                    reasonForBooking,
                });
                await booking.save();
                res.status(201).json({message:"Booking created Successfully",booking});
            }catch(error){
                console.log("failed to create",error);
                res.status(500).json({message:"server error"});
            }
        },
        getAllBookings:async(req,res)=>{
            try{
                const bookings = await Booking.find().populate('facility User');
                res.status(201).json(bookings);
            }catch(error){
                console.log("failed to get bookings",error);
                res.status(500).json({message:"Server error"});
            }
        },
        getBookingById:async(req,res)=>{
            try{
                const booking = await Booking.findById().populate('facility User');
                res.status(201).json(booking);
            }catch(error){
                console.log("failed to get booking",error);
                res.status(500).json({message:"Server error"});
            }
        },
        updateBooking:async(req,res)=>{
            try {
                const { facility, bookingDate, bookingStartTime, bookingEndTime, reasonForBooking, status } = req.body;
                const updatedBooking = await Booking.findByIdAndUpdate(
                    req.params.id,
                { facility, bookingDate, bookingStartTime, bookingEndTime, reasonForBooking, status, updatedAt: Date.now() }, 
                { 
                    new: true, 
                    runValidators: true  //imp one
                } 
                ).populate('facility user');
        
                if (!updatedBooking) {
                    return res.status(404).json({ message: 'Booking not found' });
                }
                res.status(201).json({ message: 'Booking updated successfully', booking: updatedBooking });
            } catch (error) {
                res.status(500).json({ message: 'Error updating booking', error: error.message });
            }
        },
        deleteBooking:async(req,res)=>{
            try {
                const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
                if (!deletedBooking) {
                    return res.status(404).json({ message: 'Booking not found' });
                }
                res.status(201).json({ message: 'Booking deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting booking', error: error.message });
            }
        },
        approveBooking:async(req,res)=>{
            try {
                const booking = await Booking.findById(req.params.id);
                if (!booking) {
                    return res.status(404).json({ message: 'Booking not found' });
                }
                booking.status = 'approved';
                booking.approvedBy = req.user._id; // Log who approved
                await booking.save();
                res.status(200).json({ message: 'Booking approved' });
            } catch (error) {
                res.status(500).json({ message: 'Error approving booking', error: error.message });
            }
        },
        rejectBooking:async(req,res)=>{
            try {
                const { rejectionReason } = req.body;
                const booking = await Booking.findById(req.params.id);
                if (!booking) {
                    return res.status(404).json({ message: 'Booking not found' });
                }
                booking.status = 'rejected';
                booking.rejectionReason = rejectionReason;
                await booking.save();
                res.status(200).json({ message: 'Booking rejected' });
            } catch (error) {
                res.status(500).json({ message: 'Error rejecting booking', error: error.message });
            }
        }
    };

    const facilityController={
        createFacility:async(req,res)=>{
            try {
                const { name, description, capacity, availableDays, availableStartTime, availableEndTime, bookingSlots } = req.body;
        
                const facility = new Facility({
                    name,
                    description,
                    capacity,
                    availableDays,
                    availableStartTime,
                    availableEndTime,
                    bookingSlots,
                });
            
                await facility.save();
                res.status(201).json({ message: 'Facility created successfully', facility });
                } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating facility', error: error.message });
                }
        },
        getAllFacilities:async(req,res)=>{
            try {
                const facilities = await Facility.find();
                res.status(201).json(facilities);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching facilities', error: error.message });
            }
        },
        getFacilityById:async(req,res)=>{
            try {
                const facility = await Facility.findById(req.params.id);
                if (!facility) {
                    return res.status(404).json({ message: 'Facility not found' });
                }
                res.status(201).json(facility);
                } catch (error) {
                res.status(500).json({ message: 'Error fetching facility', error: error.message });
                }
        },
        updateFacility:async(req,res)=>{
            try {
                const { name, description, capacity, availableDays, availableStartTime, availableEndTime, bookingSlots } = req.body;
            
                const updatedFacility = await Facility.findByIdAndUpdate(
                    req.params.id,
                    { name, description, capacity, availableDays, availableStartTime, availableEndTime, bookingSlots, updatedAt: Date.now() },
                    { new: true, runValidators: true }
                );
            
                if (!updatedFacility) {
                    return res.status(404).json({ message: 'Facility not found' });
                }
                res.status(201).json({ message: 'Facility updated successfully', facility: updatedFacility });
                } catch (error) {
                res.status(500).json({ message: 'Error updating facility', error: error.message });
                }
        },        
        deleteFacility:async(req,res)=>{
            try {
                const deletedFacility = await Facility.findByIdAndDelete(req.params.id);
                if (!deletedFacility) {
                    return res.status(404).json({ message: 'Facility not found' });
                }
                res.status(200).json({ message: 'Facility deleted successfully' });
                } catch (error) {
                res.status(500).json({ message: 'Error deleting facility', error: error.message });
                }
        },            
    };

    const userController={
        createUser:async(req,res)=>{
            try {
                const { username, password, role, email } = req.body;
        
                // 1. Check if the user already exists (optional but recommended)
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
            
                // 2. Hash the password
                const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
            
                const newUser = new User({
                    username,
                    password: hashedPassword, // Store the hashed password
                    role,
                    email,
                });
            
                await newUser.save();
                res.status(201).json({ message: 'User created successfully', user: { _id: newUser._id, username, role, email} }); // Don't send back the password!
                } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating user', error: error.message });
            }
        },
        getAllUsers:async(req,res)=>{
            try {
                const users = await User.find().select('-password'); // Exclude passwords from the results
                res.status(201).json(users);
                } catch (error) {
                res.status(500).json({ message: 'Error fetching users', error: error.message });
                }
        },
        getUserById:async(req,res)=>{
            try {
            const user = await User.findById(req.params.id).select('-password'); // Exclude password
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(201).json(user);
            } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
        },
        updateUser:async(req,res)=>{
            try {
                const { username, role, email, password } = req.body;
                let updateData = { username, role, email, updatedAt: Date.now() };
            
                if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    updateData.password = hashedPassword;
                }
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    updateData,
                    { new: true, runValidators: true }
                ).select('-password');
            
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User updated successfully', user: updatedUser });
                } catch (error) {
                console.error("Error updating user:", error); // Log the error for debugging
                res.status(500).json({ message: 'Error updating user', error: error.message });
            }
        },
        deleteUser:async(req,res)=>{
            try {
                const deletedUser = await User.findByIdAndDelete(req.params.id);
                if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
                }
                res.status(201).json({ message: 'User deleted successfully' });
                } catch (error) {
                res.status(500).json({ message: 'Error deleting user', error: error.message });
                }
        },               
    };

    export {bookingController,facilityController,userController};