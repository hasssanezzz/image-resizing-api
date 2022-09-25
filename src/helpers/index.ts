function getFileExtension(filename: string): string {
  return filename.split(".")[filename.split(".").length - 1]
}

function isValidFilename(filename: string): boolean {
  if (filename.length === 0) return false

  // eslint-disable-next-line no-useless-escape
  const re1 = /^[^\\/:\*\?"<>\|]+$/
  const re2 = /^\./
  const re3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i

  const extension = getFileExtension(filename)
  const t = filename.includes(".") && ["png", "jpg", "jpeg"].includes(extension.toLocaleLowerCase())

  return re1.test(filename) && !re2.test(filename) && !re3.test(filename) && t
}

export { isValidFilename, getFileExtension }
