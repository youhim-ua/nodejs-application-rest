const multer = require('multer')
const path = require('path')

const UPLOAD_DIR = path.resolve('./tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2097152 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  }
})

module.exports = {
  uploadMiddleware,
  UPLOAD_DIR
}
