const db = require("../../connection/db");

const createTransaction = (values) => {
  const sql = "INSERT INTO transactions SET ?";
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const fetchTransactions = (selectColumns, whereClause) => {
  const sql = `SELECT ${selectColumns} FROM transactions ${whereClause}`;
  console.log(sql);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createTransaction,
  fetchTransactions,
};
