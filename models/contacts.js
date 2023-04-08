const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError}=require("../utils")


const contactsSchema = new Schema({
  name: {
    type: String,
     required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
     required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
     required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

contactsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite:Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = { addSchema,updateFavoriteSchema };

const Contact = model("contact", contactsSchema);

module.exports = { Contact, schemas };










// const { nanoid } = require("nanoid");
// const fs = require("fs/promises");
// const path=require("path")

// const contactsPath = path.resolve("models","contacts.json");

// const listContacts = async () => {
//    const data = await fs.readFile(contactsPath,"utf-8");
//     return JSON.parse(data)
// }

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//     const contact = contacts.find(item => item.id === contactId);
//     return contact || null
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === contactId);
//     if (index === -1) {
//         return null
//     }
//     const [result] = contacts.splice(index, 1)
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result
// }

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone
//   }
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return newContact
// }

// const updateContact = async (contactId, body) => {
// const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === contactId);
//     if (index === -1) {
//         return null
//   }
  
//   contacts[index]={contactId,...body}
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index]

// }



// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }




