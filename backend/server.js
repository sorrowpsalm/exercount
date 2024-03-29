const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//configures environment variable
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//to use middleware
app.use(cors());                    //cross origin
app.use(express.json());    //parsing the json which we are going to send and receive

//to connect database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })


//adding routes

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

  
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});