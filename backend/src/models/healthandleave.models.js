import mongoose,{Schema} from 'mongoose';
import User from '../models/user.model.js'

//student schema
const student = new Schema({
    studentname:{
        type:Schema.ObjectId.name,
        ref:"User",
        required:true
    },
    StudentId:{
        type:String,
        required:true,
        unique:true
    },
    studentemail:{
        type:Schema.ObjectId.email,
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
const healthrecord = new Schema({
    student:{
        type:Schema.ObjectId.name,
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
    reportedby:{
        type:String,
        enum:['Doctor','Self','Teacher'],
        required:true
    },
    diagnosis:{
        type:String
    }
});

const HealthRecord= mongoose.model('HealthRecord', healthrecord);

const leaverecord = new Schema({
    student:{
        type:Schema.ObjectId.name,
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

const LeaveRecord= mongoose.model('LeaveRecord', leaverecord);

const notification = new Schema({
    type:{
        type:String,
        enum:['sick','leave'],
        required:true
    },
    student:{
        type:Schema.ObjectId.name,
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

export default {Student,HealthRecord,LeaveRecord,Notification};

