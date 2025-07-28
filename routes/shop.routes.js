const express = require('express');
const shopRouter = express.Router();
const shopController = require('../controllers/shop.controller.js');


// login user
// shopRouter.post()

// Add new stock
shopRouter.post('/add-shop', shopController.addShop);

// // Get all stocks (excluding soft-deleted)
shopRouter.get('/get-shops', shopController.getShops);

// // Update stock by id
// shopRouter.put('/update-stock/:id', stockController.updateStock);

// // Soft delete stock by id
// shopRouter.delete('/delete-stock/:id', stockController.deleteStock);

module.exports = shopRouter;