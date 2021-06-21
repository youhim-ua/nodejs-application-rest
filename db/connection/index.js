const mongoose = require('mongoose')

require('dotenv').config()

const uriDb = process.env.DB_HOST

const connectionMongo = async () => {
  return await mongoose.connect(
    uriDb,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

module.exports = {
  connectionMongo
}
