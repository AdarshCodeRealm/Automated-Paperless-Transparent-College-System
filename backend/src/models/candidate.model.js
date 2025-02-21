import mongoose,{Schema} from "mongoose";

const candidateSchema = new Schema({
    name:{
        type:Schema.Types.ObjectId,
        ref:"userProfile",
        required:true
    },
    position:{type:String,required:true},
    votes:{type:Number,default:0}
});

export default mongoose.model("Candidate", candidateSchema)