import mongoose from "mongoose";

// 1. Event Schema
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // Or use a more robust time format
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the event
    budget: { type: Number, required: true },
    sponsorshipRequested: { type: Boolean, default: false }, // Flag if sponsorship is requested
    sponsorshipDetails: { type: String }, // Details of the sponsorship request
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Application status
    submittedDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    approvers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of approvers for this event
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        date: { type: Date, default: Date.now }
    }],
    attachments: [{ type: String }], // Store file paths or URLs
});

  // 2. Budget Approval Schema (Can be embedded within Event or separate)
const budgetApprovalSchema = new mongoose.Schema({
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    }, 
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    approvers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        date: { type: Date, default: Date.now }
    }],
    submittedDate: { 
        type: Date, 
        default: Date.now 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
});

  // 3. Sponsorship Schema (Can be embedded within Event or separate)
const sponsorshipSchema = new mongoose.Schema({
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    },
    amountRequested: { 
        type: Number 
    },
    details: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    approvers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        date: { type: Date, default: Date.now }
    }],
    submittedDate: { 
        type: Date, 
        default: Date.now 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
});

  // 4. User Schema (Important for referencing organizers and approvers)
const userSchema = new mongoose.Schema({

    role: { 
        type: String, 
        enum: ['Student', 'Faculty', 'Admin'], 
        required: true 
    }, 
});

  // 5. Notification Schema (For real-time updates)
const notificationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    message: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['ApplicationUpdate', 'Approval', 'Comment'], 
        required: true 
    },
    relatedObjectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    }, 
    read: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Event = mongoose.model('Event', eventSchema);
const BudgetApproval = mongoose.model('BudgetApproval', budgetApprovalSchema);
const Sponsorship = mongoose.model('Sponsorship', sponsorshipSchema);
const Usership = mongoose.model('Usership', userSchema);
const Notification = mongoose.model('Notification', notificationSchema);


export { Event, BudgetApproval, Sponsorship, Usership, Notification };