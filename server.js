require ('dotenv').config()
require('./config/database');
require('./model/consumer');

const express = require("express");
const PORT = process.env.PORT || 3333
const express_session = require('express-session')

const app = express()

const consumerRouter = require('./router/consumer')
const router = require('./router/orders')
const paymentRouter = require('./router/payment')
const korapayRouter = require('./router/korapay')

const {passport} = require('./middlewares/passport');

app.use(express.json())
app.use(express_session({
    secret: 'Oshio-Ella',
    resave: true,
    saveUninitialized: true

}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', consumerRouter)
app.use('/api/v1', router)
app.use('/api/v1', paymentRouter)
app.use('/api/v1', korapayRouter)

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

app.use((err, req, res, next) =>{
    if(err.name === 'TokenExpiredError'){
            res.status(401).json({
              message: 'Session expired: please login to continue'
            })
        }
    if (err.name === 'MulterError'){
        return res.status(400).json({
            message: err.message
        })
    }
    console.log(err.message)
    res.status(500).json({
        message: 'Something went wrong'
    })
})

app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`)
});