const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //mongoose and bcrypt deal with asyncronous functions
const User = require('../models/userModel');
const userModel = require('../models/userModel');

//CREATE
//@desc     Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler( async(req,res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ){
        res.status(400);
        throw new Error('Please add all fields');
    }

    //Check if user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //Create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    });

    //Verify user was created and respond
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

});


//@desc     Authenticate user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler( async(req,res) => {
    const {email, password} = req.body;

    //find user by email
    const user = await userModel.findOne({email});
    //verify password

    if(password === undefined){
        res.status(400);
        throw new Error('Invalid credentials: No password');
    }else if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid credentials: Incorrect password');
    }


});


//@desc     Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler( async(req,res) => {
    const {_id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
    });
});


//JWT generator
const generateToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '30d'}
        );
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
}