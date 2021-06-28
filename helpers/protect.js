const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/users')
const JWT_SECRET_KEY = process.env.SALT

const protect = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)

    jwt.verify(token, JWT_SECRET_KEY, async (error, decodedUser) => {
      const user = await getUserById(decodedUser?.id)
      console.log(decodedUser)

      if (error || !user || !user.token || user.token !== token) {
        return res.status(401).json({ message: 'Invalide token' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  protect
}
