const express = require('express')
const router = express.Router()
const Joi = require('joi')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
    .required(),

  phone: Joi.string()
    .max(15)
    .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const data = await getContactById(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ data })
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json(
        { message: 'missing required name field or unexpected value' }
      )
    }
    const data = await addContact(req.body)
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const data = await removeContact(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    console.log(error.message)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json(
        { message: 'missing fields or unexpected value' }
      )
    }
    const { contactId } = req.params
    const data = await updateContact(contactId, req.body)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
