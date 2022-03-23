const express = require('express');
const router = express.Router();
const { setGoal, getGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');


//CREATE & READ
router.route('/').post(protect, setGoal).get(protect, getGoal);
//UPDATE & DELETE
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;