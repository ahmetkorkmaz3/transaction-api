const express = require('express')

const router = express.Router()

const {
    getTransactionList,
    getTransaction,
} = require('../controllers/transaction')

router.get('/', getTransactionList)
router.get('/:transactionId', getTransaction)

module.exports = router
