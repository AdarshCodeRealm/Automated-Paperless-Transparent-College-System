// 6. Anonymous Complaint System
    // ● Students can submit anonymous complaints, which are visible to all.
    // ● Complaints undergo moderation; vulgar content is blocked (no inappropriate images/videos).
    // ● Identity of anonymous complainants is revealed only if a majority of board members approve.

    const raiseComplaint =async (req, res) => {
        const { complaintText, complaintType, complaintImages } = req.body;
        console.log(req.body.name);
        const avatarLocalPath = req.files?.avatar[0]?.path
        console.log(avatarLocalPath);
        res.status(200).json( {status: "success", message: "complaint raised"} );
    
    }

    export {raiseComplaint}


