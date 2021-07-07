const {
  addUser,
  getUserByEmail,
  updateSubscription,
  updateUserAvatar
} = require('../../services/users')

const {
  login,
  logout
} = require('../../services/authService')

const { imgResizer } = require('../../helpers/imageResizer')
const { imgSaver } = require('../../helpers/imageSaver')

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
    if (req.user) {
      const { email, subscription } = req.user
      return res.status(200).json({ email, subscription })
    }
  } catch (error) {
    next()
  }
}

const changeCurrentUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body
    if (req.user) {
      const result = await updateSubscription(req.user.id, subscription)
      return res.status(200).json({ message: 'subscription changed', result: result.subscription })
    }
  } catch (error) {
    next()
  }
}

const changeCurrentUserAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      const nameOfFile = req.file.filename
      const pathToImage = req.file.path
      await imgResizer(pathToImage)
      const savePathUrl = await imgSaver(nameOfFile)
      const { avatarURL } = await updateUserAvatar(req.user.id, savePathUrl)
      return res.status(200).json({ avatarURL })
    }
  } catch (error) {
    next()
  }
}

module.exports = {
  registrationUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  changeCurrentUserSubscription,
  changeCurrentUserAvatar
}
