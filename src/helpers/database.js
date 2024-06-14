const mongoose = require('mongoose')

const connect = async () => {
    const db = await mongoose.connect(process.env.MONGO_URI)

    console.log('Database connected:', db.connection.name)
}

module.exports = { connect }
