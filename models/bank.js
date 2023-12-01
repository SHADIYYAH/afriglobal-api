const { Schema, model } = require("mongoose");

const bankSchema = new Schema({
    



    bank_name: {
        type:String,
        required:true
    },

    bank_account_number: {
        type: String,
        required:true
    },

    account_name: {
        type: String,
        required:true
    }
})

const Bank = model('Banks', bankSchema);
