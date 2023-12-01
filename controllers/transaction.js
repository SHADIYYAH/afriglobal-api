const transactionModel = require("../models/transaction");
const {
  TransactionTypeEnum,
  TransactionStatusEnum,
} = require("../constants/enums");
const { startPayment } = require("../services/payment");

const debit = async (amountPassed, email, comments) => {
  const amount = Math.abs(Number(amountPassed));
  const userDetails = await getUser(email);
  const initialbalance = Number(userDetails.amount_after);
  if (initialbalance < amount) {
    return [false, "Insufficient balance"];
  }
  const newbalance = initialbalance - amount;

  transaction(
    TransactionTypeEnum.DEBIT,
    comments,
    amount,
    userDetails.email,
    TransactionStatusEnum.SUCCESS
  );
  return true;
};

const startTransaction = async (req, res) => {
  const { amount, email } = req.body;
  if (!amount || !email) {
    res.status(400).json({
      status: false,
      message: "Amount and email are required",
    });
    return;
  }

  const initialiseTransaction = await startPayment(amount, email);
  delete initialiseTransaction.data.data.access_code;
  res.status(200).json({
    status: true,
    message: "Transaction initialized successfully",
    data: initialiseTransaction.data.data,
  });
};

const completeTransaction = async (req, res) => {
  const { reference } = req.body;
  const user_id = req.params.user;
  res.status(400).json({
    status: false,
    message: "All fields are required",
    others: `${reference} ${user_id}`,
  });
  return;
};

const transaction = (type, description, amount, transaction_status) => {
  return transactionModel.create({
    type: type,
    amount: amount,
    comments: description,
    transaction_status: transaction_status,
  });
};

const getTransactions = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;
    const pages = page - 1 || 0;
    const offset = pages * limit;

    const getAllTransactions = await transactionModel.findAll({
      limit: limit,
      offset: offset,
    });

    res.status(200).json({
      status: true,
      message: "Transaction logged successfully",
      data: getAllTransactions,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const dailyTransaction = (req, res) => {
  const { type } = req.query;
  const { id } = req.body;
};
const weeklyTransaction = (req, res) => {
  const { type } = req.query;
  const { id } = req.body;
};
const monthlyTransaction = async (req, res) => {
  const { type } = req.query;
  const { id } = req.body;
};

module.exports = {
  debit,
  getTransactions,
  startTransaction,
  completeTransaction,
  dailyTransaction,
  weeklyTransaction,
  monthlyTransaction,
};
