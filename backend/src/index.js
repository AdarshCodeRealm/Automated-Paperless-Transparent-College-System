// npm run dev  --->> to start nodemon server
import connectDB from "./db/index.js"
import { app } from "./app.js"
import dotenv from "dotenv"

dotenv.config({ 
  path: ".env" 
})


const port = process.env.PORT || 5000

connectDB()
  .then(()=>{
    app.get("/", (req, res) => {
      res.status(200).json({
        status: "success",
        message: "Server is running ",
      });
    });
    app.listen(port, () => {
      console.log(`⚙️  Local Server is running at port : ${port}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed :", error);
  }
)


