const Joi = require('joi');

const productsDTO = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '{{#label}} length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required().messages({
    'string.min': '{{#label}} must be greater than or equal to 1',
  }),
}).messages({
  'any.required': '{{#label}} is required',
});

const productsValidation = (req, res, next) => {
  const { error } = productsDTO.validate(req.body, { abortEarly: false });
  if (!error) return next();
  if (error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  res.status(422).json({ message: error.message });
};

module.exports = productsValidation;