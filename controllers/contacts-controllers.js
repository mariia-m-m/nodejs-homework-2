

const { HttpError } = require("../helpers/index");

const { Contact } =require("../models/contacts")

const {ctrlWrapper}=require("../utils/index")

const getAllContacts = async (req, res) => {
    try {
        const result = await Contact.find({},"-createdAt -updatedAt");
        res.json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getContactByID = async (req, res) => {
  
        const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId});
    
    const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id ${contactId} not found`)
        }
        res.json(result)
    }
   

const addContact = async (req, res) => {

     const result = await Contact.create(req.body);
        res.status(201).json(result)
    }
    

const updateContact = async (req, res) => {
   
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
        if (!result) {
            throw HttpError(404, `Contact with id ${contactId} not found`)
        }
        res.status(200).json(result)
    }

    const updateFavoriteById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
        
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
        }
        
 res.status(200).json(result)
}


const deleteContact = async (req, res) => {
    
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id ${contactId} not found`)
        }
        res.status(200).json({ message: "contact deleted" })
    }
    

module.exports = {
    getAllContacts:ctrlWrapper(getAllContacts),
    getContactByID:ctrlWrapper(getContactByID),
    addContact:ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteById: ctrlWrapper(updateFavoriteById),
    deleteContact:ctrlWrapper(deleteContact),
}