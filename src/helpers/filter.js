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
        filters.type = type.split(',')
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
        const dateFilter = getQueryForDateFilter(date)

        if (dateFilter) {
            filters.created_at = dateFilter
        }
    }

    return filters
}

function getQueryForDateFilter(value) {
    const now = new Date()

    const startOfDay = (date) => {
        const result = new Date(date)
        result.setHours(0, 0, 0, 0)
        return result
    }

    const endOfDay = (date) => {
        const result = new Date(date)
        result.setHours(23, 59, 59, 999)
        return result
    }

    switch (value) {
        case 'today':
            return { $gte: startOfDay(now) }

        case 'yesterday':
            const yesterday = new Date(now)
            yesterday.setDate(yesterday.getDate() - 1)
            return {
                $gte: startOfDay(yesterday),
                $lt: endOfDay(yesterday),
            }

        case 'last_7_days':
            const sevenDaysAgo = new Date(now)
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            return { $gte: startOfDay(sevenDaysAgo) }

        case 'last_30_days':
            const thirtyDaysAgo = new Date(now)
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            return { $gte: startOfDay(thirtyDaysAgo) }

        case 'last_1_years':
            const oneYearAgo = new Date(now)
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
            return { $gte: startOfDay(oneYearAgo) }
    }
}

module.exports = { getFilters }
