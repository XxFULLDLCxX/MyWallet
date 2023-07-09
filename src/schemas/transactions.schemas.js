import joi from "joi";

export const transaction_schema = joi.object({
  date: joi.string().required(),
  title: joi.string().required(),
  value: joi.number().precision(1).greater(0).required(),
});

