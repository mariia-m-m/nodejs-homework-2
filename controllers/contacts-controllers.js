

const { HttpError } = require("../helpers");

const { Contact } =require("../models/contacts")

const {ctrlWrapper}=require("../utils")

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
    
        const result = await Contact.find({owner},"-createdAt -updatedAt",{skip, limit}).populate("owner");
        res.json(result)
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

    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
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