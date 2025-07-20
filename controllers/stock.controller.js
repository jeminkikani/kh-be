const Stock = require('../models/stock.model');

// Add new stock
exports.addStock = async (req, res) => {
    try {
        const { date, shop_name, opening_stock, sold_by, sale_Qty, closing_stock, total_sale } = req.body;
        const newStock = new Stock({
            date,
            shop_name,
            opening_stock,
            sold_by,
            sale_Qty,
            closing_stock,
            total_sale
        });

        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all stocks (excluding soft-deleted)
exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({ deleted: { $ne: true } });
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Soft delete stock by updating a "deleted" field
exports.deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStock = await Stock.findByIdAndUpdate(
            id,
            { $set: { deleted: true } },
            { new: true }
        );
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.status(200).json({ message: 'Stock soft deleted', stock: updatedStock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update stock by id
exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedStock = await Stock.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.status(200).json(updatedStock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

