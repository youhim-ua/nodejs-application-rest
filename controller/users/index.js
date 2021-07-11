const {
  addUser,
  getUserByEmail,
  getUserByVerifyToken,
  updateSubscription,
  updateUserAvatar,
  updateVerifyField,
  updateVerifyTokenField
} = require('../../services/users')

const {
  login,
  logout
} = require('../../services/authService')

const { sendVerifyMail } = require('../../services/verifyMailService')

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
    const { verifyToken } = user
    sendVerifyMail(email, verifyToken)
    return res.status(201).json({ user })
  } catch (error) {
    next()
  }
}

const loginUserController = async (req, res, next) => {
  try {
    const token = await login(req.body)
    const { verify } = await getUserByEmail(req.body.email)

    if (!verify) {
      return res.status(401).json({ message: 'Login failure! You are not authorize email.' })
    }

    if (!token) {
      return res.status(401).json({ message: 'Email or password is wrong' })
    }
    const { email, subscription } = await getUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  } catch (error) {
    next()
  }
}

const verificationUserController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const userWithVerifyToken = await getUserByVerifyToken(verificationToken)

    if (userWithVerifyToken) {
      const { id } = userWithVerifyToken
      await updateVerifyField(id)
      await updateVerifyTokenField(id)

      return res.status(200).json({ message: 'Verification successful' })
    }
    return res.status(404).json({ message: 'User not found' })
  } catch (error) {
    next()
  }
}

const resendNewVerifyLetterController = async (req, res, next) => {
  try {
    const { email } = req.body
    const { verify, verifyToken } = await getUserByEmail(email)

    if (!verify) {
      sendVerifyMail(email, verifyToken)
      return res.status(200).json({ message: 'Verification email sent' })
    }
    return res.status(400).json({ message: 'Verification has already been passed' })
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
  verificationUserController,
  resendNewVerifyLetterController,
  logoutUserController,
  getCurrentUserController,
  changeCurrentUserSubscription,
  changeCurrentUserAvatar
}
