const Joi = require('joi')

const schemaEmail = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua', 'org'] } })
    .required()
})

const validationEmail = async (req, res, next) => {
  try {
    const validationResult = schemaEmail.validate(req.body)
    if (validationResult.error) {
      res.status(400).json(
        { message: 'missing required field email' }
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validationEmail
}
