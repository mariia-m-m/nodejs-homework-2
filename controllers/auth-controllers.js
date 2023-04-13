const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../utils");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;



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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({ token })
}

const getCurrent = async (req, res) => {
    const { email} = req.user;

    res.json = ({
        email,
    })
};

const logOut = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}
    


module.exports = {
    registration: ctrlWrapper(registration),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logOut:ctrlWrapper(logOut)
}