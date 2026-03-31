const ordersModel = require("../model/orders");

exports.createOrder = async (req, res) =>{
    try {
        const { orderType, ordersAmount, ordersQuntity, ordersContainer, describeOrder, totalOrders} = req.body

        const order = {
            orderType,
            ordersAmount, 
            ordersQuntity, 
            ordersContainer, 
            describeOrder, 
            totalOrders,
            orderedBy: req.consumer.id
        }
        
        const newOrder = new ordersModel(order)
        const orders = await ordersModel.find()
        await newOrder.save()
        res.status(201).json({
            message: "Order created successfully",
            data: newOrder,
            count: orders.length
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Cannot create order at the moment'
        })
    }
}