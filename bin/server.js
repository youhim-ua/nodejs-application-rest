const { connectionMongo } = require('../db/connection')

const { createFolderIsNotExist } = require('../helpers/createNotExDir')
const { UPLOAD_DIR } = require('../services/downloadService')
const { IMAGE_STORAGE_DIR } = require('../helpers/imageSaver')

require('dotenv').config()

const app = require('../app')

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await connectionMongo()
    console.log('Database connection successful')

    app.listen(PORT, async (err) => {
      await createFolderIsNotExist(UPLOAD_DIR)
      await createFolderIsNotExist(IMAGE_STORAGE_DIR)
      if (err) console.error('Error at a server launch:', err)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
    process.exit(1)
  }
}

startServer()
