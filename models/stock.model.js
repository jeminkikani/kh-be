const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    shop_name: {
        type: String,
        required: true
    },
    opening_stock: {
        type: Number,
        required: true
    },
    sold_by: {
        type: String,
        required: true
    },
    sale_Qty: {
        type: Number,
        required: true
    },
    closing_stock: {
        type: Number,
        required: true
    },
    total_sale: {
        type: Number,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const stock_management = mongoose.model('stock_management', stockSchema);

module.exports = stock_management;
