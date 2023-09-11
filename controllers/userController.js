const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

const signup = async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, username, password: hashedPassword, role: role || "basic" });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "8d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        res.json(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ "message": 'Invalid Credentials' });

        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return res.status(401).json({ "message": 'Invalid Credentials' });

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        const newUser = await User.findOneAndUpdate({ _id: user._id }, { accessToken }, { new: true, select: '-password' })
        res.status(200).json(newUser)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    signup,
    login
}
