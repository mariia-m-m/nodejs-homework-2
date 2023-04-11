const express = require('express')

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody} = require("../../utils");

const { schemas } = require("../../models/contacts");

const {authenticate}= require("../../utils")


router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, ctrl.getContactByID);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', authenticate, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateContact);

router.delete('/:contactId', authenticate, ctrl.deleteContact);


module.exports = router
