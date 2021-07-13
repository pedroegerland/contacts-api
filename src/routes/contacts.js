const { Router } = require('express')
const contactController = require('../controllers/contactsController')

const router = Router()
router
  .post('/contacts', contactController.createContact)
  .get('/contacts', contactController.listContacts)
  .get('/contacts/:id', contactController.getContact)
module.exports = router