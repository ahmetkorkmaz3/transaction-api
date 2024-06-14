const getFilters = (queryParams) => {
    const {
        customer_id,
        order_id,
        type,
        refundable,
        min_amount,
        max_amount,
        start_date,
        end_date,
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

    if (start_date) {
        filters.created_at = { $gte: new Date(start_date) }
    }

    if (end_date) {
        filters.created_at = {
            ...filters.created_at,
            $lte: new Date(end_date),
        }
    }

    return filters
}

module.exports = { getFilters }
