const { Contact } = require('../../model/contacts')

const listContacts = async () => await Contact.find({})

const paginateListContacts = async (page, limit) =>
  await Contact.paginate({}, { page, limit })

const paginateListFavoriteContacts = async (page, limit, favorite) =>
  await Contact.paginate({ favorite }, { page, limit })

const getContactById = async (id) => await Contact.findById(id)

const addContact = async ({ name, email, phone }) => await Contact.create({ name, email, phone })

const updateContact = async (id, body) =>
  await Contact.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

const removeContact = async (id) => await Contact.findByIdAndDelete(id)

const updateStatusContact = async (id, { favorite }) =>
  await Contact.findByIdAndUpdate(id, { $set: { favorite } }, { new: true })

module.exports = {
  listContacts,
  paginateListContacts,
  paginateListFavoriteContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact
}
