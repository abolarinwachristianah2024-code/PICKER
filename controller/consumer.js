const consumerModel = require('../model/consumer')
const bcrypt = require('bcrypt')
const cloudinary = require('../middlewares/cloudinary')
const fs = require('fs')

exports.createConsumer = async (req, res) =>{
    try {
        const { name, email, phone, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newConsumer = await consumerModel.create({
            name,
            email,
            phone,
            password: hashPassword
        })
        res.status(201).json({
            message: "Consumer created successfully",
            data: newConsumer
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const file = req.file
        const uploadResponse = await cloudinary.uploader.upload(file.path);
        const extractSecureurl = uploadResponse.secure_url;

        if (!req.file) {
            return res.status(400).json({ 
                message: "No file uploaded" 
            });
        }
        const filePath = req.file.path;
        await fs.promises.unlink(filePath)

        const{ name } = req.body
        const{ id } = req.params
        const profilePicture={
            secureUrl:extractSecureurl,
            publicId:uploadResponse.public_id
        }
        const newUpdate = await consumerModel.findByIdAndUpdate(id, { name, profilePicture }, {new: true
        })
        res.status(201).json({
            message: "Consumer updated successfully",
            data: newUpdate
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
