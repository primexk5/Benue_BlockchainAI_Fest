const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(100).required(),
  lastName: Joi.string().trim().min(1).max(100).required(),
  company: Joi.string().trim().min(1).max(255).required(),
  position: Joi.string().trim().min(1).max(255).required(),
  corporateEmail: Joi.string().trim().email().required(),
  secondaryEmail: Joi.string().trim().email().optional().allow('', null),
  phone: Joi.string()
    .trim()
    .pattern(/^[+\d\s\-().]{7,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid format.',
    }),
  whatsapp: Joi.string()
    .trim()
    .pattern(/^[+\d\s\-().]{7,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'WhatsApp number must be a valid format.',
    }),
  industry: Joi.string().trim().max(255).optional().allow('', null),
  city: Joi.string().trim().max(100).optional().allow('', null),
  country: Joi.string().trim().max(100).optional().allow('', null),
});


const adminLoginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, adminLoginSchema };
