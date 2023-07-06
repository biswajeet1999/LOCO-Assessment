const transactionUtil = require("./transaction.util");
const transactionValidator = require("./transaction.validator");

const createTransaction = async (req, res) => {
  try {
    const transactionData = await transactionValidator.createTransaction.validateAsync({
      ...req.body,
      ...req.params,
    });
    const result = await transactionUtil.createTransaction(transactionData);
    return res.status(201).json(transactionData);
  } catch (err) {
    console.log("Something went wrong while creating transaction", err);
    return res.status(400).json({ error: err });
  }
};

const fetchTransactionsByType = async (req, res) => {
  try {
    const { type } = await transactionValidator.fetchTransactionsByType.validateAsync(req.params);
    const whereClause = `where type="${type}"`;
    const selectColumns = "transaction_id";
    const result = await transactionUtil.fetchTransactions(selectColumns, whereClause);
    return res.status(200).json(result.map((transaction) => transaction.transaction_id));
  } catch (err) {
    console.log("Something went wrong while creating transaction", err);
    return res.status(400).json({ error: err });
  }
};

const fetchTransactionById = async (req, res) => {
  try {
    const { transaction_id } = await transactionValidator.fetchTransactionById.validateAsync(
      req.params
    );
    const whereClause = `where transaction_id="${transaction_id}"`;
    const selectColumns = "*";
    const result = await transactionUtil.fetchTransactions(selectColumns, whereClause);
    return res.status(200).json(result);
  } catch (err) {
    console.log("Something went wrong while creating transaction", err);
    return res.status(400).json({ error: err });
  }
};

const fetchTransactionSum = async (req, res) => {
  try {
    const { transaction_id } = await transactionValidator.fetchTransactionSum.validateAsync(
      req.params
    );
    let parentIds = [];
    let result = [];
    let totalSum = 0;
    let whereClause = `WHERE transaction_id='${transaction_id}'`;
    const selectColumns = "transaction_id, amount";
    do {
      result = await transactionUtil.fetchTransactions(selectColumns, whereClause);
      parentIds = result.map((transaction) => {
        totalSum += transaction.amount;
        return transaction.transaction_id;
      });
      whereClause = `WHERE parent_id IN (${parentIds})`;
    } while (result.length > 0);
    return res.status(200).json({ sum: totalSum });
  } catch (err) {
    console.log("Something went wrong while creating transaction", err);
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  createTransaction,
  fetchTransactionsByType,
  fetchTransactionById,
  fetchTransactionSum,
};
