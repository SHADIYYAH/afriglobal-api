const Joi = require('joi')
const userValidation =(data) =>{


const userSchema = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone:Joi.string().min(11).required()
    .messages({
    'string.empty': `"Phone Number" cannot be an empty`,
    'string.min': `"Phone Number should have length of 11 digits`,
    'any.required': `"Phone Number" is a required field`,
     }),
     password:  Joi.string().min(8).required()
     .messages({
     'string.empty': `"Password" cannot be an empty`,
     'string.min': `"Password" should have a minimum length of {#limit}`,
     'any.required': `"Password" is a required field`,
     'object.regex' : `Must have at least 8 characters`,
    //  'string.pattern.base': `Password must contain at least a number, letter and special characters`
     })
})
return userSchema.validate(data)
}

module.exports= {userValidation}