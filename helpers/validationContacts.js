const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua', 'org'] } })
    .required(),

  phone: Joi.string()
    .max(15)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),

  phone: Joi.string()
    .max(15)
}).min(1)

const schemaUpdateFavoriteContact = Joi.object({
  favorite: Joi.boolean().required()
})

const validationNewContact = (req, res, next) => {
  try {
    const validationResult = schemaAddContact.validate(req.body)
    if (validationResult.error) {
      res.status(400).json(
        { message: 'missing fields or unexpected value' }
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}

const validationUpdateContact = (req, res, next) => {
  try {
    const validationResult = schemaUpdateContact.validate(req.body)
    if (validationResult.error) {
      res.status(400).json(
        { message: 'unexpected value' }
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}

const validationUpdateFavoriteContact = (req, res, next) => {
  try {
    const validationResult = schemaUpdateFavoriteContact.validate(req.body)
    if (validationResult.error) {
      res.status(400).json(
        { message: 'missing field favorite' }
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validationNewContact,
  validationUpdateContact,
  validationUpdateFavoriteContact
}
