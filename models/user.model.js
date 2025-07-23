const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    login_name: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', stockSchema);

module.exports = User;