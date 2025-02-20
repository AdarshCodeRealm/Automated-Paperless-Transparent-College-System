import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    facility:{
        type:String,
        required:true
    },
    user: { 
        type:String, // kon booking banara hai 
        required: true
    },
    bookingDate: { type: Date, required: true },
    bookingStartTime: { type: String, required: true },
    bookingEndTime: { type: String, required: true },   
    status: {  
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    reasonForBooking: { type: String, required: true }, 
    approvedBy: { 
        type: String,
        required:true
    },
    rejectionReason: { type: String }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const facilitySchema = new Schema({
    name: { type: String, required: true, unique: true },  //which facility do you want to use
    description: { type: String },
    capacity: { type: Number }, 
    availableDays: [{ type: String }],  
    availableStartTime: { type: String, required: true }, 
    availableEndTime: { type: String, required: true }, 
    bookingSlots: [{ 
    startTime: String,
    endTime: String
    }],
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: {  
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student'
    },
    email: { type: String, unique: true },
    
});

const Booking  = mongoose.model('Booking',bookingSchema);
const Facility  = mongoose.model('Facility',facilitySchema);
const User  = mongoose.model('User',userSchema);

export { Booking, Facility, User };