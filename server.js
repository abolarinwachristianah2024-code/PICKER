require ('dotenv').config()
require('./config/database');
require('./model/consumer');

const express = require("express");
const PORT = process.env.PORT || 3333

const app = express()
const router = require("./router/consumer")
const multer = require('multer')

app.use(express.json())
app.use(router)

app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`)
});