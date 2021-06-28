const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    }
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
  Contact
}
