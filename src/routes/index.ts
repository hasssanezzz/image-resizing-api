import express from "express"
import resizeRoute from "./resize"

const app = express.Router()

app.use("/resize", resizeRoute)

export default app
