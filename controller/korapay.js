const paymentModel = require('../model/payment');
const consumerModel = require('../model/consumer');
const orderModel = require('../model/orders');
const otpGenerator = require('otp-generator')
const axios = require('axios')

exports.initializePayment = async(req, res) =>{
    try {
        const consumerId = req.user.id;
 
        const { orderId } = req.params
        const consumer = await consumerModel.findById(consumerId)
        if(!consumer){
            return res.status(404).json({
                message: 'Consumer not found'
            })
        }

        const order = await orderModel.findById(orderId)
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }

        // generate reference
        const ref = otpGenerator.generate(12, {specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false});
        const reference = `TCA-Splita-${ref}`

        const paymentData ={
            //method 1 => amount: parseInt(group.contributionAmoun)
            // method 2 =>
            amount: Number(order.ordersAmount),
            currency: 'NGN',
            reference,
            customer: {
                email: consumer.email,
                name: consumer.name
            },
            redirect_url: 'https://www.google.com/'
        }
        // initialize payment using axios
        const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${process.env.KORA_API_KEY}`
            }
        })

        // create a payment record in our database
        const payment = new paymentModel({
            amount: paymentData,
            reference,
            consumerId,
            orderId,
            orderType: order.ordersType
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
        console.log(error.message)
        res.status(500).json({
            message: "Error initializing payment"
        })
    }
}

exports.verifyPayment = async (req, res) =>{
    try {
        // extract the reference from the query
        const {reference} = req.query;

        // verify the status of the payment from kora
        
        const {data} = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.KORA_API_KEY}`
            }
        });
        console.log(data)
        // update payment in our app
        const payment = await paymentModel.findOne({reference})
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

exports.getAllPaymentsByUser = async (req, res) => {
    try {
        const consumerId = req.user.id;
       
        const consumer = await consumerModel.findById(consumerId)
        if(!consumer){
            return res.status(404).json({
                message: 'Consumer not found'
            })
        }
    
        const allPayments = await paymentModel.find({ consumerId }).sort({ createdAt: -1});
        res.status(200).json({
                message: 'All payments by consumer',
                data: allPayments
            })
 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}