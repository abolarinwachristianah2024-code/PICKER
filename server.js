require ('dotenv').config()
require('./config/database');
require('./model/consumer');

const express = require("express");
const PORT = process.env.PORT || 3333
const consumerRouter = require('./router/consumer')
const router = require('./router/orders')

const app = express()

app.use(express.json())
app.use(consumerRouter)
app.use(router)

app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`)
});