const { Schema, model } = require('mongoose');

const Bank = new Schema({
    userID: String,
    money: {
        type: Number,
        default: 0
    },
    role: String
});

module.exports = model('Bank', Bank)