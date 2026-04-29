const paymentModel = require('../model/payment');
const consumerModel = require('../model/consumer');
const orderModel = require('../model/orders');
const axios = require('axios')

exports.initializePaystackPayment = async(req, res)=>{
     try {
        // get the group id from the params
        const consumerId = req.consumer.id;
        // get the user id from the req.user
        const { orderId } = req.params

        // check if user still exists
        const consumer = await consumerModel.findById(consumerId)
        if(!consumer){
            return res.status(404).json({
                message: 'Consumer not found'
            })
        }
// check if group exists
        const order = await orderModel.findById(orderId)
        if(!order){
            return res.status(404).json({
                message: 'Orders not found'
            })
        }
// create payment data object 
        const paymentData ={
            amount: order.ordersAmount * 100,
            currency: 'NGN',
            email: consumer.email,
            callback_url: 'https://www.google.com/'
        }
        // initialize payment using axios
        const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`
            }
        })

        // create a payment record in our database
        const payment = new paymentModel({
            amount: order.ordersType,
            reference: `TCA-Splita-${response.data?.data.reference}`,
            consumerId,
            orderId,
            ordersType: order.ordersType
        })
        // save in the database
        await payment.save()

        // send a sucess response
        res.status(200).json({
            message: 'Payment initialized successful',
            data: response.data?.data,
            payment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error initializing payment"
        })
    }
}

exports.verifyPaystackPayment = async (req, res) =>{
    try {
        // extract the reference from the query
        const {reference} = req.query;

        // verify the status of the payment from kora
        
        const {data} = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`
            }
        });
        console.log(data)
        // update payment in our app
        const payment = await paymentModel.findOne({reference: `TCA-Splita-${reference}`})
        if(!payment){
            return res.status(404).json({
                    message: 'Payment not found'
                })
        }
            // check the status of the API and transaction if successful
        if (data?.status === true && data?.data.status === 'success' ){
            // update the status of payment
            payment.status = data?.data.status;
            await payment.save()

            return res.status(200).json({
                message: 'Payment verified successfully',
                data: payment
            })
        }else{
            payment.status = data?.data.status;
            await payment.save();

            return res.status(200).json({
                message: 'Payment verified successfully',
                data: payment
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error fetching payment'
        })
    }
}