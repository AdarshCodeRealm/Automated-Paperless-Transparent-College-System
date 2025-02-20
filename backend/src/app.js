import express from "express"
import cookieParser from "cookie-parser"
import Cors from "cors"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import applicationAndApprovalSystemRouter from "./routes/applicationAndApprovalSystem.routes.js"
import budgetAndSponsorshipTrackingRouter from "./routes/budgetAndSponsorshipTracking.routes.js"
import complaintRouter from "./routes/complaint.routes.js"
import electionRouter from "./routes/election.routes.js"
import facilityBookingRouter from "./routes/facilityBooking.routes.js"
import healthAndLeaveNotifyRouter from "./routes/healthAndLeaveNotify.routes.js"
import integrityAndCheatingRecordRouter from "./routes/integrityAndCheatingRecord.routes.js"
import testRouter from "./routes/test.route.js"
import electionRoutes from './routes/election.routes.js'
import userRouter from "./routes/user.routes.js"

const app = express()
app.use(
  Cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(express.static("public"))
app.use(cookieParser())



app.use("/applicationAndApprovalSystem", applicationAndApprovalSystemRouter)
app.use("/budgetAndSponsorshipTracking", budgetAndSponsorshipTrackingRouter)
app.use("/complaint", complaintRouter)
app.use("/election", electionRouter)
app.use("/facilityBooking", facilityBookingRouter)
app.use("/healthAndLeaveNotify", healthAndLeaveNotifyRouter)
app.use("/integrityAndCheatingRecord", integrityAndCheatingRecordRouter)
app.use("/test", testRouter)
app.use('/election', electionRoutes);
app.use("/user", userRouter)

export {app}