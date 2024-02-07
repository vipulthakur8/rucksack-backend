
const UserModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

/* user signup handler */
exports.signupHandler = async(req, res, next) => {
    console.log("Singup Handler", req.body);
    try {
        const {firstName, lastName, phone, email, password} = req.body;
        let user = await UserModel.findOne({email})
        if (user) {
            const error = new Error("Email already exists");
            error.status = 404;
            throw error;
        }
        let hashedPassword = await bcrypt.hash(password, 12);
        let newUser = new UserModel({firstName, lastName, phone, email, password: hashedPassword});
        return newUser.save().then((result) => {
            res.status(201).json({
                signedUp: true
            })
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

/* user login handler */
exports.loginHandler = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        let user = await UserModel.findOne({email});
        if (!user) {
            const error = new Error("Email does not exist")
            error.statusCode = 404;
            throw error;
        }
        let pwdCompare = await bcrypt.compare(password, user.password)
        if (!pwdCompare) {
            const error = new Error("Email and password do not match");
            error.statusCode = 401;
            throw error;
        }

        const accessToken = jwt.sign({
            email: user.email,
            userId: user._id.toString(),
            phone: user.phone
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '24h'
        })

        return res.status(200).json({
            authenticated: true,
            userDetails: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            },
            accessToken
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}