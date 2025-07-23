const Stock_sale = require('../models/sale_stock.model');

// Add new stock
exports.addStock = async (req, res) => {
    try {
        const { date, shop_name, opening_stock, sold_by, sale_Qty, closing_stock } = req.body;
        const newStock = new Stock_sale({
            date,
            shop_name,
            opening_stock,
            sold_by,
            sale_Qty,
            closing_stock
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
        const stocks = await Stock_sale.aggregate([
            {
                $match: { is_deleted: { $ne: true } }
            },
            {
                $lookup: {
                    from: 'shops',           // name of the collection to join
                    localField: 'sold_by',   // field in Stock_sale
                    foreignField: '_id',     // field in shops
                    as: 'sold_by_info'       // output array field
                }
            },
            {
                $unwind: '$sold_by_info'  // optional: if you want a single object instead of an array
            }
        ]);

        res.status(200).json({
            message: 'data retrieve success',
            data: stocks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Soft delete stock by updating a "deleted" field
exports.deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStock = await Stock_sale.findByIdAndUpdate(
            id,
            { $set: { is_deleted: true } },
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
        const updatedStock = await Stock_sale.findByIdAndUpdate(
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