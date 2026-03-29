const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    otp:{
        type: String,
        trim: true,
        default: () => {
            return Math.round(Math.random() * 1e4)
            .toString()
            .padStart(4, "0");
        },
    },
    otpExpiry: {
        type: Date,
        default: () => {
            return new Date(Date.now() + 30 * 60 * 1000)
        }
    },
    profilePicture: {
        secureUrl: {
            type: String,
            trim: true
        },
        publicId: {
            type: String,
            trim: true
        },
    },
}, {timeStamp: true});

const consumerModel = mongoose.model('consumerInfo', consumerSchema)

module.exports = consumerModel