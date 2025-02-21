import mongoose from 'mongoose';
import { type } from 'os';

//student schema
const student = new mongoose.Schema({
    studentname:{
        type:String,
        required:true
    },
    studentEmail:{
        type:String,
        required:true,
        unique:true
    },
    parentEmail:{
        type:String,
        required:true
    },
    classCoordinatorEmail:{
        type:String,
        required:true
    }
});
const Student= mongoose.model('Student', student);

//schema for health records
const healthRecord = new mongoose.Schema({
    studentEmail:{
        type:String,
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
},{
    timestamps:true
}
);
const HealthRecord= mongoose.model('HealthRecord', healthRecord);

const leaveRecord = new mongoose.Schema({
    studentEmail:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
}
);
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

