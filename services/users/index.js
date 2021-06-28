const { User } = require('../../model/users')

const addUser = async ({ email, password }) => await User.create({ email, password })

const getUserByEmail = async (email) => await User.findOne({ email })

const getUserById = async (id) => await User.findById(id)

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  updateToken,
}
