require("dotenv").config();
const express = require("express");
require("./src/connection/db");
const transactionRoute = require("./src/routes/transaction/transaction.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/transactionservice", transactionRoute);
