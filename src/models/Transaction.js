const mongoose = require('mongoose')

const amountSchema = new mongoose.Schema({
    asInt: { type: Number, required: true },
    asFloat: { type: Number, required: true },
    asString: { type: String, required: true },
})

const pointSchema = new mongoose.Schema({
    asInt: { type: Number, required: true },
    asFloat: { type: Number, required: true },
    asString: { type: String, required: true },
})

const transactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    customer_id: { type: Number, required: false },
    order_id: { type: Number, required: false },
    type: { type: String, required: false },
    refundable: { type: Number, required: false },
    amount: { type: amountSchema, required: false },
    refundable_amount: { type: String, required: false },
    point: { type: pointSchema, required: false },
    refunded_amount: { type: String, required: false },
    payment_id: { type: String, default: null },
    wallet_provider_payment_id: { type: String, required: false },
    description: { type: String, required: false },
    mask_cc: { type: String, default: null },
    refunded_at: { type: Date, default: null },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    receipt_url: { type: String, required: false },
    type_name: { type: String, required: false },
})

module.exports = mongoose.model('Transaction', transactionSchema)
