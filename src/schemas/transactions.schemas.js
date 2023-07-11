import joi from "joi";

export const transaction_schema = joi.object({
  description: joi.string().required(),
  value: joi.number().precision(2).greater(0).required(),
  operation: joi.string().valid('input', 'output').required()
});
