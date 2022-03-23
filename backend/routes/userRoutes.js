const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');



//CREATE & LOGIN
router.post('/', registerUser);
router.post('/login', loginUser);

//READ
router.get('/me',protect, getMe);



module.exports = router;
