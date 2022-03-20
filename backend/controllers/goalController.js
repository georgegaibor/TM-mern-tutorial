const asyncHandler = require('express-async-handler');

//CREATE
//@desc     Set goals
//@route    POST /api/goals
//@access   Private
const setGoal = asyncHandler(async (req,res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }
    
    res.status(200).send({
        message: 'Set goal'
    });
});

//READ
//@desc     Get goals
//@route    GET /api/goals
//@access   Private
const getGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:'Get goal'
    });
});


//UPDATE
//@desc     Update goal{id}
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message: `Update goal${req.params.id}`
    });
});

//DELETE
//@desc     Delete goal{id}
//@route    DELETE /api/goals/:id
//@access   Private
const deleteGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message: `Delete goal${req.params.id}`
    });
});


module.exports = {
    setGoal,
    getGoal,
    updateGoal,
    deleteGoal
}