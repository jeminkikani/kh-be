const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    shop_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const shop = mongoose.model('shop', stockSchema);

module.exports = shop;