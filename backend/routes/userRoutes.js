const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController')

//CREATE & LOGIN
router.post('/', registerUser);
router.post('/login', loginUser);

//READ
router.get('/me',getMe);



module.exports = router;
