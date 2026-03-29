const consumerModel = require('../model/consumer')
const bcrypt = require('bcrypt')
const cloudinary = require('../middlewares/cloudinary')
const fs = require('fs')
const {brevo} = require('../utils/brevo')
const emailTemplate = require('../email')
const jwt = require('jsonwebtoken');




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
        const consumers = await consumerModel.find()
        brevo(newConsumer.email, newConsumer.name, emailTemplate(newConsumer.name, newConsumer.otp))
        await newConsumer.save()

        res.status(201).json({
            message: "Consumer created successfully",
            data: newConsumer,
            count: consumers.length
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

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const consumer = await consumerModel.findOne({ email: email })
    console.log(consumer)

    if (!consumer) {
      return res.status(404).json({
        message: 'consumer not found'
      })
    };

    if (consumer.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP Provided'
      })
    };
    if (consumer.otpExpiry < new Date()) {
      return res.status(400).json({
        message: 'OTP has expired'
      })
    };
    consumer.isVerified = true;
    await consumer.save();
    res.status(200).json({
      message: 'OTP Verified successfully',
      data: consumer
    })
  } catch (error) {
    console.log(error.message),
      res.status(500).json({
        message: "Something went wrong"
      })
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const consumer = await consumerModel.findOne({ email: email })

    if (!consumer) {
      return res.status(404).json({
        message: 'Invalid Credentials'
      })
    };

    const correctPassword = await bcrypt.compare(password, consumer.password);

    if (!correctPassword) {
      return res.status(400).json({
        message: 'Invalid Credentials'
      })
    };

    
    if (consumer.isVerified = false) {
      return res.status(400).json({
        message: 'Please verify your email'
      })
    };

    const token = jwt.sign(
      { id: consumer._id, role: consumer.role },
      process.env.SECRET_KEY,
      { expiresIn: '1day' }
    );

    res.status(200).json({
      message: 'Login sucessfull',
      token,
      consumer
    })
  } catch (error) {
    console.log(error),
      res.status(500).json({
        message: "Something went wrong"
      })
  }
}