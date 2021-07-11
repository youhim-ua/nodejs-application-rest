const { User } = require('../../model/users')

const addUser = async ({ email, password }) => {
  return await User.create({ email, password })
}

const getUserByEmail = async (email) => await User.findOne({ email })

const getUserByVerifyToken = async (verifyToken) => await User.findOne({ verifyToken })

const getUserById = async (id) => await User.findById(id)

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

const updateVerifyField = async (id) =>
  await User.findOneAndUpdate({ _id: id }, { $set: { verify: true } })

const updateVerifyTokenField = async (id) =>
  await User.findOneAndUpdate({ _id: id }, { $set: { verifyToken: null } })

const updateSubscription = async (id, subscription) =>
  await User.findByIdAndUpdate(id, { $set: { subscription } }, { new: true })

const updateUserAvatar = async (id, avatar) =>
  await User.findByIdAndUpdate(id, { $set: { avatarURL: avatar } }, { new: true })

module.exports = {
  addUser,
  getUserByEmail,
  getUserByVerifyToken,
  getUserById,
  updateToken,
  updateVerifyField,
  updateVerifyTokenField,
  updateSubscription,
  updateUserAvatar
}
