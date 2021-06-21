const { connectionMongo } = require('../db/connection')

require('dotenv').config()

const app = require('../app')

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await connectionMongo()
    console.log('Database connection successful')

    app.listen(PORT, (err) => {
      if (err) console.error('Error at a server launch:', err)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
    process.exit(1)
  }
}

startServer()
