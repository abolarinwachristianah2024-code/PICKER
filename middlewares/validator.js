const joi = require('joi');

exports.signUpValidator = (req, res, next)=>{
    const schema = joi.object({
        name: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
            'any.required': "Fullname is required",
            "string.empty": "Fullname cannot be empty",
            'string pattern.base': "Fullname cannot contain numbers and must be at least 4 characters"
        }),
        email: joi.string().email().required().messages({
            'any.required': "Email is required",
            "string.empty": "Email cannot be empty",
            'string pattern.base': "Email must be valid email"
        }),
        phone: joi.string().pattern(/^\d{11}$/).required().messages({
            'any.required': "Phone number is required",
            "string.empty": "Phone number cannot be empty",
            'string pattern.base': "Phone number must only contain digits and must be 11 digits"
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any.required': "Password is required",
            "string.empty": "Password cannot be empty",
            'string pattern.base': "Password must be at least 8 characters and must include 1 uppercase and 1 lowercase"
        })
    })
    const { error } = schema.validate(req.body);
    // console.log(error.details[0])
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

// exports.orderSignUp = (req, res, next)=>{
//     const schema = joi.object({
//         groupName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
//             'any.required': "groupName is required",
//             "string.empty": "groupName cannot be empty",
//             'string pattern.base': "groupName cannot contain numbers and must be at least 4 characters"
//         }),
//         contributionAmount: joi.string().pattern(/^(₦|\$|NGN|USD)?\s?\d{1,3}(,\d{3})*(\.\d{2})?$/).required().messages({
//             'any.required': "contribution amount is required",
//             "string.empty": "contribution amount cannot be empty",
//             'string pattern.base': "contribution amount must be valid currency"
//         }),
//         contributionFreq: joi.string().valid('daily', 'weekly', 'monthly').required().messages({
//             'any.required': "Contribution frequency is required",
//             "string.empty": "Contribution frequency cannot be empty",
//             'string pattern.base': "Contribution frequency must be either daily, weekly, or monthly"
//         }),
//         payoutFreq: joi.string().valid('daily', 'weekly', 'monthly').required().messages({
//             'any.required': "Payout Frequency is required",
//             "string.empty": "Payout Frequency cannot be empty",
//             'string pattern.base': "Payout Frequency must be either daily, weekly, or monthly"
//         }),
//         describeGroup: joi.string().min(3).max(500).trim().required().messages({
//             'any.required': "Group desciption is required",
//             "string.empty": "Group desciption cannot be empty",
//             'string pattern.base': "Group desciption cannot be less than 3 and must not be more than 500 characters"
//         }),
//         totalMembers: joi.string().min(2).max(5).required().messages({
//             'any.required': "Total members is required",
//             "string.empty": "Total members cannot be empty",
//             'string pattern.base': "Total members cannot be less than 3"
//         }),
//     }) 
//     const { error } = schema.validate(req.body);
//     // console.log(error.details[0])
//     if (error){
//         return res.status(400).json({
//             message: error.details[0].message
//         })
//     }
//     next()
// }

exports.resetPasswordValidator = (req, res, next) =>{
    const schema = joi.object({
        email: joi.string().email().required().messages({
            'any.required': "Email is required",
            "string.empty": "Email cannot be empty",
            'string pattern.base': "Email must be valid email"
        }),
        OTP: joi.string().pattern(/^\d{6}$/).required().messages({
            'any.required': "OTP is required",
            "string.empty": "OTP cannot be empty",
            'string pattern.base': "OTP must only contain digits and must be 6 digits"
        }),
        // password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
        //     'any.required': "Password is required",
        //     "string.empty": "Password cannot be empty",
        //     'string pattern.base': "Password must be at least 8 characters and must include 1 uppercase and 1 lowercase"
        // }),
        confirmPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
            'any.only': "Confirm Password must match password",
            'any.required': "Confirm password is required"
        })
    })
    const { error } = schema.validate(req.body);
    // console.log(error.details[0])
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.changePasswordValidator = (req, res, next) =>{
    const schema = joi.object({
        oldPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any.required': "Old Password is required",
            "string.empty": "Old Password cannot be empty",
            'string pattern.base': "Old Password must be at least 8 characters and must include 1 uppercase and 1 lowercase"
        }),
        newPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any.required': "New Password is required",
            "string.empty": "New Password cannot be empty",
            'string pattern.base': "New Password must be at least 8 characters and must include 1 uppercase and 1 lowercase"
        }),
        confirmPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
            'any.only': "Confirm Password must match password",
            'any.required': "Confirm password is required"
        })
    })
    const { error } = schema.validate(req.body);
    // console.log(error.details[0])
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}