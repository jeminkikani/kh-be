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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shops',
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
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const sale_stock = mongoose.model('sale_stock', stockSchema);

module.exports = sale_stock;