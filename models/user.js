const { Schema, model } = require('mongoose')

let user = Schema({
    username: String,
    avatar: String,
    email: String,
    password: String,
    token: String,
    recover: String,
    verification: {
        code: Number,
        verify: Boolean
    }
})

module.exports = model('user', user)
