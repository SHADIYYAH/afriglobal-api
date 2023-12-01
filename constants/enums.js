const TransactionStatusEnum = {
    PENDING: "pending",
    FAILED: "failed",
    ROLLBACK: "rollback",
    SUCCESS: "success"
}

const TransactionTypeEnum = {
    CREDIT: "credit",
    DEBIT: "debit"

}


module.exports = {
   
    TransactionTypeEnum,
    TransactionStatusEnum
}