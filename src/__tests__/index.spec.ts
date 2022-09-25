import { join } from "path"
import { isValidFilename } from "../helpers/index"
import supertest from "supertest"
import app from "../index"
import resizeImage from "../helpers/resizeImage"

// request object
const request = supertest(app)

// testing FUNCTIONS
describe("Testing the isValidFilename function: ", () => {
  it("expect img.png to be valid", () => {
    expect(isValidFilename("img.png")).toBe(true)
  })

  it("expect img.js to be not valid", () => {
    expect(isValidFilename("img.png")).toBe(true)
  })

  it("expect con.png to be not valid", () => {
    expect(isValidFilename("img.png")).toBe(true)
  })
})

describe("Testing the resizeImage function: ", () => {
  it("Not throwing and error with the images/input/pp.jpg file", () => {
    const width = 100,
      height = 100,
      filename = "pp.jpg",
      filePath = join(process.cwd(), "/images/input/" + filename),
      outputPath = join(process.cwd(), "/images/output/" + `${width}_${height}_` + filename)

    expect(async (): Promise<void> => await resizeImage({ filePath, outputPath, height, width })).not.toThrow()
  })
})

// testing ENDPOINTS
describe("Testing basic endpoints", () => {
  it("Get resize URL with no width provided /resize?height=100&filename=pp.jpg, STATUS: 400", async () => {
    const res = await request.get("/resize?width=50&height=100&filename=pp.jpg")
    expect(res.status).toBe(400)
  })

  it("Get resize URL with no file name, STATUS: 400", async () => {
    const res = await request.get("/resize?width=50&height=100")
    expect(res.status).toBe(400)
  })

  it("Get resize URL with malformed file name /resize?height=100&filename=con.jpg, STATUS: 400", async () => {
    const res = await request.get("/resize?width=50&height=100&filename=pp.jpg")
    expect(res.status).toBe(400)
  })

  it("Get resize URL with bad file extenstion /resize?height=100&filename=vid.mp4, STATUS: 400", async () => {
    const res = await request.get("/resize?width=50&height=100&filename=pp.jpg")
    expect(res.status).toBe(400)
  })

  it("Get resize URL with width less than 100 /resize?width=50&height=100&filename=pp.jpg, STATUS: 400", async () => {
    const res = await request.get("/resize?width=50&height=100&filename=pp.jpg")
    expect(res.status).toBe(400)
  })
})
