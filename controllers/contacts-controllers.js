

const { HttpError } = require("../helpers/index");

const contacts = require("../models/contacts");

const {ctrlWrapper}=require("../utils/index")

const getAllContacts = async (req, res) => {
    try {
        const result = await contacts.listContacts();
        res.json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
 
};

const getContactByID = async (req, res) => {
  
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id ${contactId} not found`)
        }
        res.json(result)
    }
   

const addContact = async (req, res) => {
   
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, 'missing required name field')
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result)
    }
    

const updateContact = async (req, res) => {
   
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


const deleteContact = async (req, res) => {
    
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id ${contactId} not found`)
        }
        res.status(200).json({ message: "contact deleted" })
    }
    

module.exports = {
    getAllContacts:ctrlWrapper(getAllContacts),
    getContactByID:ctrlWrapper(getContactByID),
    addContact:ctrlWrapper(addContact),
    updateContact:ctrlWrapper(updateContact),
    deleteContact:ctrlWrapper(deleteContact),
}