
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userAdmin = require('../models/userModel')
const bcrypt = require('bcryptjs') 







const registerUser = asyncHandler (async (req, res ) => {

    const { firstName, lastName, email, password } = req.body

    
    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please provide fields')
    }

    const userExist = await userAdmin.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
        
    const user = await userAdmin.create({
        
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

   

    } else {
        res.status(400)
        throw new Error('Invalid Admin User Data')
    }

})


const loginUser = asyncHandler(async (req, res) => {

      
    const { email, password } = req.body
    const user = await userAdmin.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: 'Log In',
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})




const profileUser = () => {
    console.log('Profile User')
}


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    profileUser
 }