const express = require('express')
const router = express.Router()
const {
  validationNewContact,
  validationUpdateContact,
  validationUpdateFavoriteContact
} = require('../../helpers/validationContacts.js')

const {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateFavoriteContactController
} = require('../../controller/contacts')

router.get('/', getContactController)
router.get('/:contactId', getContactByIdController)
router.post('/', validationNewContact, addContactController)
router.patch('/:contactId', validationUpdateContact, updateContactController)
router.delete('/:contactId', deleteContactController)
router.patch('/:contactId/favorite', validationUpdateFavoriteContact, updateFavoriteContactController)

module.exports = router
