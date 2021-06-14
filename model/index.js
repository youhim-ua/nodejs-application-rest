const fs = require('fs/promises')
const path = require('path')

// const contacts = require('./contacts.json')

const contactsPath = path.join(
  __dirname,
  './contacts.json'
)

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(contacts)
    return contactsList
  } catch (error) {
    return error.message
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(data)
    const foundContactById = contactsList.find(contact => contact.id === Number(contactId))
    return foundContactById
  } catch (error) {
    return error.message
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(data)
    const foundContactById = contactsList.find(contact => contact.id === Number(contactId))
    if (!foundContactById) {
      return
    }
    const filteredContactById = JSON.stringify(
      contactsList.filter(contact => String(contact.id) !== contactId), null, '\t'
    )
    await fs.writeFile(contactsPath, filteredContactById, 'utf8')
    return true
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async ({ name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(data)
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone
    }
    const newContactsList = JSON.stringify([newContact, ...contactsList], null, '\t')
    await fs.writeFile(contactsPath, newContactsList, 'utf8')
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body
    console.log(name, email, phone)
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(data)
    const foundContactById = contactsList.find(contact => contact.id === Number(contactId))
    if (!foundContactById) {
      return
    }
    if (foundContactById) {
      if (name) {
        foundContactById.name = name
      }
      if (email) {
        foundContactById.email = email
      }
      if (phone) {
        foundContactById.phone = phone
      }
    }
    const updatedContactsList = JSON.stringify(contactsList, null, '\t')
    await fs.writeFile(contactsPath, updatedContactsList, 'utf8')
    return foundContactById
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
