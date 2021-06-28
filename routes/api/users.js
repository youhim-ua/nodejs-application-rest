const express = require('express')
const router = express.Router()

const {
  registrationUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController
} = require('../../controller/users')

const { validationUser } = require('../../helpers/validationUsers')
const { protect } = require('../../helpers/protect')

router.post('/users/signup', validationUser, registrationUserController)
router.post('/users/login', validationUser, loginUserController)
router.post('/users/logout', protect, logoutUserController)
router.get('/users/current', protect, getCurrentUserController)

module.exports = router
