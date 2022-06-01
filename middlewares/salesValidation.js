const Joi = require('joi');

const salesDTO = Joi.array().items(
  Joi.object({
  quantity: Joi.number().min(1).label('quantity').required()
  .messages({
    'string.min': '{{#label}}  must be greater than or equal to 1',
  }),
  productId: Joi.number().label('productId').required(),
  }).messages({
  'any.required': '{{#label}} is required',
  }),
);

const salesValidation = (req, res, next) => {
  const { error } = salesDTO.validate(req.body, { abortEarly: false });
  if (!error) return next();
  if (error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  res.status(422).json({ message: error.message });
};

module.exports = salesValidation;