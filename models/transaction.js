const { Schema, model } = require("mongoose");
const transactionSchema = new Schema({
     
    type: {
        type: String,
        enum: ['CREDIT', 'DEBIT'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;