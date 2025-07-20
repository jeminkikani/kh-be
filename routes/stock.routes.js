const express = require('express');
const stockRouter = express.Router();
const stockController = require('../controllers/stock.controller.js');

// Add new stock
stockRouter.post('/add-stock', stockController.addStock);

// Get all stocks (excluding soft-deleted)
stockRouter.get('/get-stock', stockController.getStocks);

// Update stock by id
stockRouter.put('/update-stock/:id', stockController.updateStock);

// Soft delete stock by id
stockRouter.delete('/delete-stock/:id', stockController.deleteStock);

module.exports = stockRouter;
