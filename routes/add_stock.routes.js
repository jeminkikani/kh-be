    const express = require("express");
    const addStockRouter = express.Router();
    const { addStock, getStock, getStockById, updateStock, deleteStock } = require("../controllers/add_stock.controller");

    addStockRouter.post("/add-stock", addStock);
    addStockRouter.get("/get-stock", getStock);
    addStockRouter.get("/get-stock/:id", getStockById);
    addStockRouter.put("/update-stock/:id", updateStock);
    addStockRouter.delete("/delete-stock/:id", deleteStock);

    module.exports = addStockRouter;