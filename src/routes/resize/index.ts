import express, { Request, Response } from "express"
import fs from "fs"
import { join } from "path"
import { isValidFilename } from "../../helpers"
import resizeImage from "../../helpers/resizeImage"

const app = express.Router()

app.get("/", async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height }: { filename?: string; width?: string; height?: string } = req.query

  // width and height validation: checking they are numbers
  if (isNaN(+(width || "")) || isNaN(+(height || ""))) {
    res.status(400).send("Please provide a valid width and height")
    return
  }

  // width and height validation: : checking they are above 100px
  if (+(width || 0) < 100 || +(height || 0) < 100) {
    res.status(400).send("Width and height must be at least 100px")
    return
  }

  // file name validation
  if (!isValidFilename(filename || "") || !filename?.includes(".")) {
    res.status(400).send("Please provide a valid file name")
    return
  }

  const filePath = join(process.cwd(), "/images/input/" + filename)

  // checking if file exists
  if (!fs.existsSync(filePath)) {
    res.status(400).send("File not found")
    return
  }

  const outputPath = join(process.cwd(), "/images/output/" + `${width}_${height}_` + filename)

  // checking if file already have been processed
  if (fs.existsSync(outputPath)) {
    console.log("IMAGE ALREADY FOUND")
    res.sendFile(outputPath)
    return
  }

  await resizeImage({ filePath, outputPath, width: +(width || ""), height: +(height || "") })

  res.sendFile(outputPath)
})

export default app
