const Joi = require('joi')

const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua', 'org'] } })
    .required(),

  password: Joi.string()
    .min(5)
    .max(60)
    .required(),
})

const validationUser = async (req, res, next) => {
  try {
    const validationResult = schemaUser.validate(req.body)
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

const schemaUpdateSubscriptionUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

const validationUpdateSubscriptionUser = async (req, res, next) => {
  try {
    const validationResult = schemaUpdateSubscriptionUser.validate(req.body)
    if (validationResult.error) {
      res.status(400).json(
        { message: 'unexpected value, must be one of: \'starter\', \'pro\', \'business\'' }
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validationUser,
  validationUpdateSubscriptionUser
}
