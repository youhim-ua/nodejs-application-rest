const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 9)
  }
})

userSchema.methods.validPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
