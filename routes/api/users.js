const express = require('express')
const router = express.Router()

const {
  registrationUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  changeCurrentUserSubscription
} = require('../../controller/users')

const {
  validationUser,
  validationUpdateSubscriptionUser
} = require('../../helpers/validationUsers')
const { protect } = require('../../helpers/protect')

router.post('/users/signup', validationUser, registrationUserController)
router.post('/users/login', validationUser, loginUserController)
router.post('/users/logout', protect, logoutUserController)
router.get('/users/current', protect, getCurrentUserController)
router.patch('/users/current', [protect, validationUpdateSubscriptionUser], changeCurrentUserSubscription)

module.exports = router
