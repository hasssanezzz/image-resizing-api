import express, { Request, Response } from "express"
import cors from "cors"
import routes from "./routes"

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome")
})

// importing routes
app.use("/", routes)

app.all("*", (req: Request, res: Response): void => {
  res.status(404).send("URL NOT FOUND")
})

app.listen(PORT, (): void => console.log("App running on port", PORT))

export default app
