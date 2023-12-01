const bankModel = require("../models/bank")
const accountResolver = require ("../services/accountResolve")
const validateBank = require("../validations/bank")

const resolveAccount = async(req, res) => {
    const {error} = validateBank(req.query)
    if (error !== undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message || "Bad request"
        })
        return
    }
    const {account_number, bank_code} = req.query
    try{
        const getAccount_name = await accountResolver(account_number, bank_code)
        if(getAccount_name.data.status === true){
            return res.status(200).json({
                status: true,
                message: "account resolved successfully",
                data: getAccount_name.data.data.account_name
            })
        }
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}
module.exports = {resolveAccount}
