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
    customer_id: { type: Number, required: true },
    order_id: { type: Number, required: true },
    type: { type: String, required: true },
    refundable: { type: Number, required: true },
    amount: { type: amountSchema, required: true },
    refundable_amount: { type: String, required: true },
    point: { type: pointSchema, required: true },
    refunded_amount: { type: String, required: true },
    payment_id: { type: String, default: null },
    wallet_provider_payment_id: { type: String, required: true },
    description: { type: String, required: true },
    mask_cc: { type: String, default: null },
    refunded_at: { type: Date, default: null },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    receipt_url: { type: String, required: true },
    type_name: { type: String, required: true },
})

module.exports = mongoose.model('Transaction', transactionSchema)
