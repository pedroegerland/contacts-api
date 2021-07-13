const mysql = require('../models/mysql')
const postgres = require('../models/postgres')
class ContactsServices {
  constructor(db) {
    this.db = db === 'mysql' ? mysql : postgres
    console.log('db', db)
  }
  async listContacts(where = {}) {

    const { Contacts } = await this.db.create()

    return Contacts.findAll({ where: {} })
  }

  async getContact(where = {}) {

    const { Contacts } = await this.db.create()

    const contact = await Contacts
      .findOne({ where: { ...where } })
    return contact
  }

  async createContact(newContacts) {

    const { Contacts } = await this.db.create()

    newContacts.forEach(async (ct) => {

      if (this.db === mysql) {
        const ddi = ct.cellphone.slice(0, 2)
        const ddd = ct.cellphone.slice(2, 4)
        const cellphone = ct.cellphone.slice(4, 9)
        const cellphone2 = ct.cellphone.slice(9,)
        const newCellPhone = `+${ddi} (${ddd}) ${cellphone}-${cellphone2}`
        const convert = ct.name.toUpperCase()

        const f = {
          name: convert,
          cellphone: newCellPhone,
        }

        console.log('f', f)
        const contacts = await Contacts.create({ ...f })
      } else {
        const contacts = await Contacts.create({ ...ct })
      }
    });
  }
}

module.exports = { ContactsServices }