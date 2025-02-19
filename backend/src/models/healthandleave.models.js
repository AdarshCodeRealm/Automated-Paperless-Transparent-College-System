import mongoose from 'mongoose';

//student schema
const student = new mongoose.Schema({
    studentname:{
        type:mongoose.Schema.ObjectId, //ithe change karava lagtil
        ref:"User",
        required:true
    },
    StudentId:{
        type:String,
        required:true,
        unique:true
    },
    studentemail:{
        type:mongoose.Schema.ObjectId,//same
        required:true,
        unique:true
    },
    parentemail:{
        type:String,
        required:true
    },
    classCoordinatoremail:{
        type:String,
        required:true
    }
});

const Student= mongoose.model('Student', student);

//schema for health records
const healthRecord = new mongoose.Schema({
    student:{
        type:mongoose.Schema.ObjectId,//same
        ref:"Student",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    reportedBy:{
        type:String,
        enum:['Doctor','Self','Teacher'],
        required:true
    },
    diagnosis:{
        type:String
    }
});

const HealthRecord= mongoose.model('HealthRecord', healthRecord);

const leaveRecord = new mongoose.Schema({
    student:{
        type:mongoose.Schema.ObjectId,
        ref:"Student",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    // status:{
    //     type:String,
    //     enum:['Pending','Approved','Denied'],
    //     default:'Pending'
    // }
});

const LeaveRecord= mongoose.model('LeaveRecord', leaveRecord);

const notification = new mongoose.Schema({
    type:{
        type:String,
        enum:['Sick','Leave'],
        required:true
    },
    student:{
        type:mongoose.Schema.ObjectId,
        ref:"Student",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});

const Notification= mongoose.model('Notification', notification);

export {Student,HealthRecord,LeaveRecord,Notification};

