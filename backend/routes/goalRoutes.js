const express = require('express');
const router = express.Router();
const { setGoal, getGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

//CREATE & READ
router.route('/').post(setGoal).get(getGoal);
//UPDATE & DELETE
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;