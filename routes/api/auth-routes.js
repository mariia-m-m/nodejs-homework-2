const express = require("express");

const { validateBody,authenticate } = require("../../utils");

const { schemas } = require("../../models/user");

const ctrl=require("../../controllers/auth")

const router = express.Router();

router.post('/users/register', validateBody(schemas.registrationSchema), ctrl.registration);

router.post('/users/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post("/logout",authenticate, ctrl.logOut)


module.exports = router;