const express = require('express')
const router = express.Router()

const contacts = require('../controller/contactRequests.controller')

router.get('/get-all-contacts', contacts.getContactList)
router.post('/create-new-contact', contacts.createNewContact)

module.exports = router