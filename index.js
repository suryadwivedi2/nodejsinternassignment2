//getting all the libraries 

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser');
require('dotenv').config();
const app = express();


//middlewares
app.use(cors());
app.use(helmet());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

const port=process.env.PORT;


app.listen(port,()=>{
console.log(`Server is running live on port ${port}`)
})




