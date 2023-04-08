const { HttpError } = require("../helpers/index");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../utils/index");

const registration= async (req,res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        email: newUser.email,
    })
}

module.exports = {
    registration:ctrlWrapper(registration),
}