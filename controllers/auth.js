const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { HttpError } = require("../helpers/index");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../utils/index");

const registration = async (req, res) => {
    const { email,password } = req.body;
    const userDublicate = await User.findOne({ email });
    if (userDublicate) {
        throw HttpError(409,`Email ${email} in use`)
    }

    const hashPassword = await bcryptjs.hash(password,10);

    const newUser = await User.create({ ...req.body,password:hashPassword });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Incorrect password")
    };

    const payload = {
        id:user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    res.status(200).json({ token, user })
}

module.exports = {
    registration: ctrlWrapper(registration),
    login: ctrlWrapper(login)
}