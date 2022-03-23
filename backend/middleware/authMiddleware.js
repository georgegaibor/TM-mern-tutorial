const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = asyncHandler(async(req, res, next)=>{
    let token;
    const auth = req.headers.authorization;

    if(auth && auth.startsWith('Bearer')){
        try {
            //Get token from header
            token = auth.split(' ')[1];

            //decode and verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from token
            req.user = await  User.findById(decoded.id).select('-password');
            
            //call next piece of midddleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }else if(!token){
        res.status(401);
        throw new Error('Not authorized: No token ');
    }

});

module.exports = {
    protect,
}