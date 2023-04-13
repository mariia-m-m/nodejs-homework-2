const express = require("express");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers")

const {authenticate} = require("../../middlewares");

const router = express.Router();

router.post('/users/register', validateBody(schemas.registrationSchema), ctrl.registration);

router.post('/users/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post("/logout",authenticate, ctrl.logOut)


module.exports = router;