import express from "express"
import cookieParser from "cookie-parser"
import Cors from "cors"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

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

import applicationAndApprovalSystemRouter from "./routes/applicationAndApprovalSystem.routes.js"
app.use("/applicationAndApprovalSystem", applicationAndApprovalSystemRouter)

import budgetAndSponsorshipTrackingRouter from "./routes/budgetAndSponsorshipTracking.routes.js"
app.use("/budgetAndSponsorshipTracking", budgetAndSponsorshipTrackingRouter)

import complaintRouter from "./routes/complaint.routes.js"
app.use("/complaint", complaintRouter)

import electionRouter from "./routes/election.routes.js"
app.use("/election", electionRouter)

import facilityBookingRouter from "./routes/facilityBooking.routes.js"
app.use("/facilityBooking", facilityBookingRouter)

import healthAndLeaveNotifyRouter from "./routes/healthAndLeaveNotify.routes.js"
app.use("/healthAndLeaveNotify", healthAndLeaveNotifyRouter)

import integrityAndCheatingRecordRouter from "./routes/integrityAndCheatingRecord.routes.js"
app.use("/integrityAndCheatingRecord", integrityAndCheatingRecordRouter)

import testRouter from "./routes/test.route.js"
app.use("/test", testRouter)

import electionRoutes from './routes/election.routes.js'
app.use('/election', electionRoutes);

export {app}