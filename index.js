//getting all the libraries 

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();

//getting routes
const userroute = require('./routes/user')
const troute = require('./routes/transaction')

//middlewares
app.use(cors());
app.use(helmet());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/user', userroute);
app.use('/transaction', troute)



const port = process.env.PORT;


mongoose.connect(`mongodb+srv://bcae208924402018:${process.env.DB_PASSWORD}@cluster0.ieth7oj.mongodb.net/savingtrack?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(port, () => console.log(`Server is running live on port ${port}`));
    })
    .catch(err => console.log(err));





