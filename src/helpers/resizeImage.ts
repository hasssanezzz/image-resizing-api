import sharp from "sharp"

async function resizeImage({
  filePath,
  outputPath,
  width,
  height,
}: {
  filePath: string
  outputPath: string
  width: number
  height: number
}): Promise<void> {
  try {
    await sharp(filePath)
      .resize(width, height, {
        fit: "cover",
        position: "center",
      })
      .toFile(outputPath)
  } catch (err) {
    if (err) throw err
  }
}

export default resizeImage
