const express = require('express')
const router = express.Router()

const {
  registrationUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  changeCurrentUserSubscription,
  changeCurrentUserAvatar
} = require('../../controller/users')

const {
  validationUser,
  validationUpdateSubscriptionUser
} = require('../../helpers/validationUsers')
const { protect } = require('../../helpers/protect')

const { uploadMiddleware } = require('../../services/downloadService')

router.post('/users/signup', validationUser, registrationUserController)
router.post('/users/login', validationUser, loginUserController)
router.post('/users/logout', protect, logoutUserController)
router.get('/users/current', protect, getCurrentUserController)
router.patch('/users/current', [protect, validationUpdateSubscriptionUser], changeCurrentUserSubscription)
router.patch('/users/avatars',
  [protect, uploadMiddleware.single('avatar')],
  changeCurrentUserAvatar)

module.exports = router
