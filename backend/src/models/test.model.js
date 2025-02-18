import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
})


// TTI indexing for autodelete object
testSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 })
export default mongoose.model("test", testSchema)
