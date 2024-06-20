const getFilters = (queryParams) => {
    const {
        customer_id,
        order_id,
        type,
        refundable,
        min_amount,
        max_amount,
        date,
    } = queryParams

    const filters = {}

    if (customer_id) {
        filters.customer_id = Number(customer_id)
    }

    if (order_id) {
        filters.order_id = Number(order_id)
    }

    if (type) {
        filters.type = type
    }

    if (refundable !== undefined) {
        filters.refundable = Number(refundable)
    }

    if (min_amount) {
        filters['amount.asFloat'] = { $gte: Number(min_amount) }
    }
    if (max_amount) {
        filters['amount.asFloat'] = {
            ...filters['amount.asFloat'],
            $lte: Number(max_amount),
        }
    }

    if (date) {
        filters.created_at = getQueryForDateFilter(date)
    }

    return filters
}

function getQueryForDateFilter(value) {
    const now = new Date()

    switch (value) {
        case 'today':
            const startOfToday = new Date(now)
            startOfToday.setHours(0, 0, 0, 0)
            return { createdAt: { $gte: startOfToday } }
        case 'yesterday':
            const startOfYesterday = new Date(now)
            startOfYesterday.setDate(startOfYesterday.getDate() - 1)
            startOfYesterday.setHours(0, 0, 0, 0)

            const endOfYesterday = new Date(now)
            endOfYesterday.setDate(endOfYesterday.getDate() - 1)
            endOfYesterday.setHours(23, 59, 59, 999)

            return {
                createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
            }
        case 'last_7_days':
            const sevenDaysAgo = new Date(now)
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            return { createdAt: { $gte: sevenDaysAgo } }
        case 'last_30_days':
            const thirtyDaysAgo = new Date(now)
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            return { createdAt: { $gte: thirtyDaysAgo } }
        case 'last_1_years':
            const oneYearAgo = new Date(now)
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
            return { createdAt: { $gte: oneYearAgo } }
        default:
            return {}
    }
}

module.exports = { getFilters }
