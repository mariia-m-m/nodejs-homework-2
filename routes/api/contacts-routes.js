const express = require('express')

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody} = require("../../utils");

const { schemas } = require("../../models/contacts");

const { isValidId, authenticate } = require("../../middlewares");



router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactByID);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);


module.exports = router;
