import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

export default mongoose.model("test", testSchema)
        