const Joi = require("joi");

const createTransaction = Joi.object({
  transaction_id: Joi.number().min(1).required(),
  amount: Joi.number().min(0).required(),
  type: Joi.string().min(2).required(),
  parent_id: Joi.number().min(1).optional(),
});

const fetchTransactionsByType = Joi.object({
  type: Joi.string().min(2).required(),
});

const fetchTransactionById = Joi.object({
  transaction_id: Joi.number().min(1).required(),
});

const fetchTransactionSum = Joi.object({
  transaction_id: Joi.number().min(1).required(),
});

module.exports = {
  createTransaction,
  fetchTransactionsByType,
  fetchTransactionById,
  fetchTransactionSum,
};
