const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    Totalincome: {
        type: Number,
        default: 0
    },
    TotalExpense: {
        type: Number,
        default: 0
    },
    Savings: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)