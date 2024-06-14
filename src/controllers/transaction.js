const Transaction = require('../models/Transaction')
const { getFilters } = require('../helpers/filter')

exports.getTransactionList = async (req, res) => {
    try {
        const filters = getFilters(req.query)

        const transactions = await Transaction.find(filters)

        res.status(200).json(transactions)
    } catch (err) {
        res.status(500).json({ error: 'Veri çekilirken bir hata oluştu.', err })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId

        const transaction = await Transaction.findOne({ id: transactionId })

        if (!transaction) {
            return res.status(404).json({ error: 'İşlem bulunamadı.' })
        }

        res.status(200).json(transaction)
    } catch (err) {
        res.status(500).json({ error: 'Veri çekilirken bir hata oluştu.' })
    }
}
