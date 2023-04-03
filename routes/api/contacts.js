const express = require('express')

const router = express.Router()

const Joi = require("joi")

const {HttpError}=require("../../helpers/index")

const contacts = require("../../models/contacts")

router.get('/', async (req, res, next) => {
  try { 
  const result = await contacts.listContacts();
  res.json(result) }
  catch (error) {
    res.status(500).json({message:error.message})
   }
 
})

router.get('/:contactId', async (req, res, next) => {
   try { 
     const { contactId } = req.params;
     const result = await contacts.getContactById(contactId);
     if (!result) {
       throw HttpError(404,`Contact with id ${contactId} not found`)
     }
     res.json(result)
}
   catch (error) {
   next(error)
   }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400,'missing required name field')
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
   }
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`)
    }
    res.status(200).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`)
    }
    res.status(200).json({message:"contact deleted"})
   }
  catch (error) {
    next(error)
  }
})

const addSchema = Joi.object({
  name: Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
})

module.exports = router
