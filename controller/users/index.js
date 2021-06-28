const {
  addUser,
  getUserByEmail,
  getUserById
} = require('../../services/users')
const {
  login,
  logout
} = require('../../services/authService')

const registrationUserController = async (req, res, next) => {
  const { email, password } = req.body
  const existUser = await getUserByEmail(email)
  if (existUser) {
    return res.status(409).json({
      message: 'Email in use'
    })
  }
  try {
    const user = await addUser({ email, password })
    return res.status(201).json({ user })
  } catch (error) {
    next()
  }
}

const loginUserController = async (req, res, next) => {
  try {
    const token = await login(req.body)

    if (!token) {
      res.status(401).json({ message: 'Email or password is wrong' })
    }
    const { email, subscription } = await getUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  } catch (error) {
    next()
  }
}

const logoutUserController = async (req, res, next) => {
  try {
    await logout(req.user.id)
    return res.status(204).json({ message: 'No Content' })
  } catch (error) {
    next()
  }
}

const getCurrentUserController = async (req, res, next) => {
  try {
    const currentUser = await getUserById(req.user.id)

    if (currentUser) {
      const { email, subscription } = currentUser
      res.status(200).json({ email, subscription })
    }
  } catch (error) {
    next()
  }
}

module.exports = {
  registrationUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController
}
