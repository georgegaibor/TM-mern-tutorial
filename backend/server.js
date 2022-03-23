const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db')


connectDB();

const app = express();

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes')); // redirect api/goals to the corresponding file
app.use('/api/users', require('./routes/userRoutes')); // redirect api/users to the corresponding file


app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
