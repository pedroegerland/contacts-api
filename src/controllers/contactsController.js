const { ContactsServices } = require('../services/contactsServices')
const redis = require('../middlewares/redis')

class ContactsController {
  listContacts = async (req, res) => {  

    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' })
    }

    const jwt = req.headers.authorization
    console.log('jwt', jwt)
    const token = await redis.get('jwt-mcp')
    console.log('token', token)

    console.log('isEqual', jwt === token)

    const db = jwt === token ? 'mysql' : 'postgresql'
    console.log('jwt is equal', jwt === token)

    const contactsServices = new ContactsServices(db)

    try {
      const contacts = await contactsServices.listContacts()
      return res.status(200).json(contacts)  
    } catch (err) {
      return res.status(500).json(err.message)
    }
  }

  getContact = async (req, res) => {  

    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' })
    }

    const { id } = req.params

    const jwt = req.headers.authorization
    console.log('jwt', jwt)
    const token = await redis.get('jwt-mcp')
    console.log('token', token)

    const db = jwt === token ? 'mysql' : 'postgresql'
    console.log('jwt is equal', jwt === token)

    const contactsServices = new ContactsServices(db)

    try {
      const contact = await contactsServices.getContact({ id })
      return res.status(200).json(contact)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  }

  createContact = async (req, res) => {
    console.log('init createContact')  

    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' })
    }

    const {contacts} = req.body

    const jwt = req.headers.authorization
    console.log('jwt', jwt)
    const token = await redis.get('jwt-mcp')
    console.log('token', token)

    const db = jwt === token ? 'mysql' : 'postgresql'
    console.log('jwt is equal', jwt === token)

    const contactsServices = new ContactsServices(db)

    try {
      console.log('enter contactsServices') 
      const createdContacts = await contactsServices.createContact(contacts)
      console.log('end createContact ContactsController', createdContacts) 
      return res.status(200).json(createdContacts)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  }
}

module.exports = new ContactsController