const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    consumerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "consumerInfo",
        require: true
    },
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "orderInfo",
        require: true
    },
    amonunt: {
        type: Number,
        require: true
    },
    reference: {
        type: String,
        require: true
    },
    groupName: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['processing', 'success', 'failed', 'abandoned'],
        default: 'processing'
    },
},{timestamps: true})

// create payment model
const paymentModel = mongoose.model('payments', paymentSchema);

module.exports = paymentModel;