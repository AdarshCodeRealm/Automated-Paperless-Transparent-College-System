import mongoose,{Schema} from "mongoose";
import {userProfile} from "../models/user.model.js"

const candidateSchema = new Schema({
    name:{type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    position:{type:String,required:true},
    votes:{type:Number,default:0}
});

export default mongoose.model("Candidate", candidateSchema)