const contacts = require('../model/contactRequests.model')

const getContactList = async (req, res) => {
    try {
        const contact = await contacts.find()

        return res.status(200).json({
            success: true,
            data: contact
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error occured in contact controller'
        })
    }
}

const createNewContact = async (req, res) => {
    const { name, email, subject, message } = req.body
    
    if (!req.body) {
        res.status(422).json({
            success: false,
            message: `Body can't be empty`
        })
    }
    if (!email || !name || !subject || !message) {
        return res.status(422).json({
            success: false,
            message: 'All the fields are required'
        })
    }

   try {
     const newContact = await contacts.create({
         name,email,subject, message
     })
 
     return res.status(201).json({
         success: true,
         data: newContact,
         message: 'Form submitted successfully'
     })
     
   } catch (error) {
       return res.status(500).json({
           success: false,
           message: 'Something went wrong',
           error: error.message
        })
   }

}
module.exports = {getContactList, createNewContact}