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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required:true
  }
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

