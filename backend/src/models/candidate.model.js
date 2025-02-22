import mongoose,{Schema} from "mongoose";

const candidateSchema = new Schema({
    name:{
        type:Schema.Types.ObjectId,
        ref:"userProfile",
        required:true
    },
    position:{type:String,required:true},
    year:{type:String},
    Email:{type:String,required:true},
});

export default mongoose.model("Candidate", candidateSchema)