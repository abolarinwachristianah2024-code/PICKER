const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
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

const groupModel = mongoose.model('groupInfo', groupSchema)

module.exports = groupModel;