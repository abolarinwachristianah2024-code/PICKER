const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ordersType:{
        type: String,
        enum:["simple", "combo", "executive", "family pack"],
        trim: true
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"consumerInfo",
        required: true
    },
    ordersAmount:{
        type: String,
        required: true,
        trim: true
    },
    ordersContainer:{
        type: String,
        enum:["plastic takeaway", "styrofoam box", "compartment containers", "bento boxes"],
        trim: true
    },
    describeOrder:{
        type: String,
        required: true,
        trim: true
    },
    totalOrders:{
        type: Number,
        trim: true,
    },
    

}, {timeStamp: true});

const orderModel = mongoose.model('orderInfo', orderSchema)

module.exports = orderModel;