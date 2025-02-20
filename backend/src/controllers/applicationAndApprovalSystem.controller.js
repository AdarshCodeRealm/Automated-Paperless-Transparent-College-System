// 4. Transparent Application & Approval System
    // ● Single portal for submitting applications related to:
    // ○ Event organization
    // ○ Budget approvals
    // ○ Sponsorships
    // ● Applications visible to all students and faculty.
    // ● Approval workfl ow: Designated authority reviews requests.
    // ● Priority-based escalation: Unattended applications gain priority over time.
    // ● Real-time tracking: Students and faculty can track the status of applications

    import { Event, BudgetApproval, Sponsorship, Usership, Notification } from "../models/applicationAndApprovalSystem.model.js"
    import bcrypt from "bcrypt"

    // Event Controller
const eventController = {
    createEvent: async (req, res) => {
        try {
        const { title, description, date, time, location, budget, sponsorshipRequested, sponsorshipDetails, approvers } = req.body;
        const organizer = req.user._id; // Assuming you have authentication middleware that adds the user to req.user

        const newEvent = new Event({
            title,
            description,
            date,
            time,
            location,
            organizer,
            budget,
            sponsorshipRequested,
            sponsorshipDetails,
          approvers, // Array of user IDs who are approvers
        });

        const savedEvent = await newEvent.save();

        // Create notifications for approvers
        for (const approver of approvers) {
            const notification = new Notification({
            user: approver,
            message: `New event "${title}" requires your approval.`,
            type: 'ApplicationUpdate',
            relatedObjectId: savedEvent._id,
        });
        await notification.save();
        }

        res.status(201).json(savedEvent); // 201 Created
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
        }
    },

    getAllEvents: async (req, res) => {
    try {
    const events = await Event.find().populate('organizer approvers'); // Populate organizer and approvers
    res.json(events);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
        },
    
        getEventById: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id).populate('organizer approvers comments.user'); // Populate comments and the user who made the comment
            if (!event) {
            return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
        },
    
        updateEvent: async (req, res) => {
        try {
            const { title, description, date, time, location, budget, sponsorshipRequested, sponsorshipDetails, approvers, status } = req.body; // Add status in update
            const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                date,
                time,
                location,
                budget,
                sponsorshipRequested,
                sponsorshipDetails,
                approvers,
                status, // Update the status
                lastUpdated: Date.now()
            },
            { new: true, runValidators: true } // Return updated document and validate
            ).populate('organizer approvers');
    
            if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
            }
    
            // Create notifications for approvers when the event is updated (optional)
            if (status === 'Approved' || status === 'Rejected') { // Example: Send a notification when the event is approved or rejected
            for (const approver of updatedEvent.approvers) {
                const notification = new Notification({
                user: approver,
                message: `Event "${updatedEvent.title}" status updated to ${status}.`,
                type: 'ApplicationUpdate',
                relatedObjectId: updatedEvent._id,
                });
                await notification.save();
            }
            }
    
            res.json(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
        },
    
        deleteEvent: async (req, res) => {
        try {
            const deletedEvent = await Event.findByIdAndDelete(req.params.id);
            if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
            }
            res.status(204).end(); // 204 No Content
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
        },
    
        addComment: async (req, res) => {
            try {
            const eventId = req.params.id;
            const { text } = req.body;
            const user = req.user._id; // Assuming you have authentication
    
            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                { $push: { comments: { user, text } } }, // Push the new comment
                { new: true, runValidators: true }
            ).populate('comments.user'); // Populate the user who made the comment
    
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
    
            // Create notification for all involved parties (e.g., organizer, approvers)
            const event = await Event.findById(eventId); // Get the event to access organizer and approvers
            const involvedUsers = [event.organizer, ...event.approvers];
            for (const involvedUser of involvedUsers) {
                const notification = new Notification({
                user: involvedUser,
                message: `New comment on event "${event.title}": ${text}`,
                type: 'Comment',
                relatedObjectId: eventId,
                });
                await notification.save();
            }
    
            res.json(updatedEvent);
            } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
            }
        },
    };

// BudgetApproval Controller
const budgetApprovalController = {
createBudgetApproval: async (req, res) => {
    try {
    const { event, amount } = req.body;
    const newBudgetApproval = new BudgetApproval({ event, amount });
    const savedBudgetApproval = await newBudgetApproval.save();

    // Create notification for approvers (if needed)
    const eventDoc = await Event.findById(event).populate('approvers');
    for (const approver of eventDoc.approvers) {
        const notification = new Notification({
        user: approver,
        message: `New budget approval request for event "${eventDoc.title}".`,
        type: 'ApplicationUpdate',
        relatedObjectId: savedBudgetApproval._id, // Or eventDoc._id
        });
        await notification.save();
    }

    res.status(201).json(savedBudgetApproval);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
},

getBudgetApprovalById: async (req, res) => {
    try {
    const budgetApproval = await BudgetApproval.findById(req.params.id).populate('event approvers comments.user');
    if (!budgetApproval) {
        return res.status(404).json({ message: 'Budget approval not found' });
    }
    res.json(budgetApproval);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
},

updateBudgetApproval: async (req, res) => {
    try {
    const { amount, status, approvers } = req.body; // Add approvers
    const updatedBudgetApproval = await BudgetApproval.findByIdAndUpdate(
        req.params.id,
        { amount, status, approvers, lastUpdated: Date.now() },
        { new: true, runValidators: true }
    ).populate('event approvers');

    if (!updatedBudgetApproval) {
        return res.status(404).json({ message: 'Budget approval not found' });
    }

    // Create notifications for approvers when the budget is updated (optional)
    if (status === 'Approved' || status === 'Rejected') {
        const eventDoc = await Event.findById(updatedBudgetApproval.event);
        for (const approver of eventDoc.approvers) {
        const notification = new Notification({
            user: approver,
            message: `Budget approval for event "${eventDoc.title}" status updated to ${status}.`,
            type: 'ApplicationUpdate',
            relatedObjectId: updatedBudgetApproval._id, // Or eventDoc._id
        });
        await notification.save();
        }
    }

    res.json(updatedBudgetApproval);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
},

// ... other CRUD operations (delete, getAll) as needed
};


// Sponsorship Controller (Similar structure to BudgetApproval)
const sponsorshipController = {
        createSponsorship: async (req, res) => {
        try {
            const { event, amountRequested, details } = req.body;
            const newSponsorship = new Sponsorship({ event, amountRequested, details });
            const savedSponsorship = await newSponsorship.save();
        
            // Create notification for approvers
            const eventDoc = await Event.findById(event).populate('approvers');
            if (!eventDoc) {
                return res.status(404).json({ message: 'Event not found' });
            }
        
            for (const approver of eventDoc.approvers) {
                const notification = new Notification({
                user: approver,
                message: `New sponsorship request for event "${eventDoc.title}".`,
                type: 'ApplicationUpdate',
                relatedObjectId: savedSponsorship._id, // Or eventDoc._id
                });
                await notification.save();
            }
        
            res.status(201).json(savedSponsorship);
            } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
            }
        },
        
        getAllSponsorships: async (req, res) => {
            try {
            const sponsorships = await Sponsorship.find().populate('event approvers');
            res.json(sponsorships);
            } catch (error) {
            res.status(500).json({ message: 'Server Error' });
            }
        },
        
        getSponsorshipById: async (req, res) => {
            try {
            const sponsorship = await Sponsorship.findById(req.params.id).populate('event approvers comments.user');
            if (!sponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
            res.json(sponsorship);
            } catch (error) {
            res.status(500).json({ message: 'Server Error' });
            }
        },
        
        updateSponsorship: async (req, res) => {
            try {
            const { amountRequested, details, status, approvers } = req.body;
            const updatedSponsorship = await Sponsorship.findByIdAndUpdate(
                req.params.id,
                { amountRequested, details, status, approvers, lastUpdated: Date.now() },
                { new: true, runValidators: true }
            ).populate('event approvers');
        
            if (!updatedSponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
        
            // Create notifications for approvers when the sponsorship is updated (optional)
            if (status === 'Approved' || status === 'Rejected') {
                const eventDoc = await Event.findById(updatedSponsorship.event);
                for (const approver of eventDoc.approvers) {
                const notification = new Notification({
                    user: approver,
                    message: `Sponsorship for event "${eventDoc.title}" status updated to ${status}.`,
                    type: 'ApplicationUpdate',
                    relatedObjectId: updatedSponsorship._id, // Or eventDoc._id
                });
                await notification.save();
                }
            }
        
            res.json(updatedSponsorship);
            } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
            }
        },
        
        deleteSponsorship: async (req, res) => {
            try {
            const deletedSponsorship = await Sponsorship.findByIdAndDelete(req.params.id);
            if (!deletedSponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
            res.status(204).end(); // 204 No Content
            } catch (error) {
            res.status(500).json({ message: 'Server Error' });
            }
        },
    
        addComment: async (req, res) => {
            try {
                const sponsorshipId = req.params.id;
                const { text } = req.body;
                const user = req.user._id;
    
                const updatedSponsorship = await Sponsorship.findByIdAndUpdate(
                    sponsorshipId,
                    { $push: { comments: { user, text } } },
                    { new: true, runValidators: true }
                ).populate('comments.user');
    
                if (!updatedSponsorship) {
                    return res.status(404).json({ message: 'Sponsorship not found' });
                }
    
                const sponsorship = await Sponsorship.findById(sponsorshipId).populate('event approvers');
                const involvedUsers = [sponsorship.event.organizer, ...sponsorship.event.approvers];
    
                for (const involvedUser of involvedUsers) {
                    const notification = new Notification({
                        user: involvedUser,
                        message: `New comment on sponsorship for event "${sponsorship.event.title}": ${text}`,
                        type: 'Comment',
                        relatedObjectId: sponsorshipId,
                    });
                    await notification.save();
                }
    
                res.json(updatedSponsorship);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        },
    };

// User Controller (Example: Get user by ID)
const userController = {
getUserById: async (req, res) => {
    try {
    const user = await Usership.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
},
// ... other user-related controllers (e.g., for updating user profile)
};

// Notification Controller
const notificationController = {
getNotificationsForUser: async (req, res) => {
    try {
    const userId = req.user._id; // Assuming authentication
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(10).populate('relatedObjectId'); // Populate the related event/application
    res.json(notifications);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
},

markNotificationAsRead: async (req, res) => {
    try {
    const notificationId = req.params.id;
    const updatedNotification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
    );
    if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(updatedNotification);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
}
};


export {eventController,budgetApprovalController,sponsorshipController,userController,notificationController};