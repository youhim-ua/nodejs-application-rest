const {
  listContacts,
  paginateListContacts,
  paginateListFavoriteContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact
} = require('../../services/contacts')

const getContactController = async (req, res, next) => {
  try {
    const { page, limit, favorite } = req.query
    if (page && limit && favorite) {
      const { docs } = await paginateListFavoriteContacts(page, limit, favorite)
      return res.status(200).json({ result: docs })
    }
    if (page && limit) {
      const { docs } = await paginateListContacts(page, limit)
      return res.status(200).json({ result: docs })
    }
    const result = await listContacts()
    return res.status(200).json({ result })
  } catch (error) {
    next()
  }
}

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await getContactById(contactId)
    if (!result) return res.status(404).json({ result: 'not found' })
    return res.status(200).json({ result })
  } catch (error) {
    next()
  }
}

const addContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    const result = await addContact({ name, email, phone })
    return res.status(201).json({ result, status: 'success' })
  } catch (error) {
    next()
  }
}

const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const body = req.body
    const result = await updateContact(contactId, body)
    return res.status(200).json({ result, status: 'success' })
  } catch (error) {
    next()
  }
}

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    await removeContact(contactId)
    return res.status(200).json({ status: 'contact deleted' })
  } catch (error) {
    next()
  }
}

const updateFavoriteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const result = await updateStatusContact(contactId, { favorite })
    return res.status(200).json({ result, status: 'success' })
  } catch (error) {
    next()
  }
}

module.exports = {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateFavoriteContactController
}
