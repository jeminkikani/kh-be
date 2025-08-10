const AddStock = require("../models/add_stock.model");

const addStock = async (req, res) => {
    try {
        const { date, opening_stock_24kt, opening_stock_18kt, add_by, sale_Qty, closing_stock_24kt, closing_stock_18kt } = req.body;
        const newStock = new AddStock({
            date,
            opening_stock_24kt,
            opening_stock_18kt,
            add_by,
            sale_Qty,
            closing_stock_24kt,
            closing_stock_18kt,
            is_deleted: false
        });
        const savedStock = await newStock.save();
        res.status(201).json({ message: "Stock added successfully", savedStock });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getStock = async (req, res) => {
    try {
        const stock = await AddStock.find({ is_deleted: false }).populate("add_by");
        res.status(200).json({ message: "Stock fetched successfully", data: stock });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getStockById = async (req, res) => {
    try {
        const stock = await AddStock.findById(req.params.id).populate("add_by");
        res.status(200).json({ message: "Stock fetched successfully", data: stock });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateStock = async (req, res) => {
    try {
        const { date, opening_stock_24kt, opening_stock_18kt, add_by, sale_Qty, closing_stock_24kt, closing_stock_18kt } = req.body;
        const updatedStock = await AddStock.findByIdAndUpdate(req.params.id, { date, opening_stock_24kt, opening_stock_18kt, add_by, sale_Qty, closing_stock_24kt, closing_stock_18kt }, { new: true });
        res.status(200).json({ message: "Stock updated successfully", data: updatedStock });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteStock = async (req, res) => {
    try {
        const deletedStock = await AddStock.findByIdAndUpdate(req.params.id, { is_deleted: true }, { new: true });
        res.status(200).json({ message: "Stock deleted successfully", data: deletedStock });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { addStock, getStock, getStockById, updateStock, deleteStock };