const express = require("express");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers")

const {authenticate,upload} = require("../../middlewares");

const router = express.Router();

router.post('/users/register', validateBody(schemas.registrationSchema), ctrl.registration);

router.get('/users/verify/:verificationCode', ctrl.verifyEmail);

router.post('/verify',validateBody(schemas.emailSchema), ctrl.resendVerifyEmail)

router.post('/users/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logOut);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;