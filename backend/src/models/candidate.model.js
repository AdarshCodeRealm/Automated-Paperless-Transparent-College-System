import mongoose,{Schema} from "mongoose";

const candidateSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    position:{type:String,required:true},
    year:{type:String},
    Email:{type:String,required:true},
    gender:{type: String, 
        enum: ["Male" , "Female"], 
        required: true}
});

export default mongoose.model("Candidate", candidateSchema)