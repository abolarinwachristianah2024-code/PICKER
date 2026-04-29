const jwt = require("jsonwebtoken")

const authentication = async (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({
                message: "Token not found"
            })
        }

        const validToken = await jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
            if(err){
                console.log(err.message)
                return res.status(500).json({
                    message: "Token validation failed"
                })
            }
            req.consumer = data
             next()
        })
        // console.log(data)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    authentication
}