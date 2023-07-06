const router = require("express").Router();
const transactionController = require("./transaction.controller");

router.put("/transaction/:transaction_id", transactionController.createTransaction);

router.get("/transaction/:transaction_id", transactionController.fetchTransactionById);

router.get("/types/:type", transactionController.fetchTransactionsByType);

router.get("/sum/:transaction_id", transactionController.fetchTransactionSum);

module.exports = router;
