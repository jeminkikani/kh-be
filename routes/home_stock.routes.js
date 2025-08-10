const express = require("express");
const homeStockRouter = express.Router();
const { addHomeStock } = require("../controllers/home_stock.controller");

homeStockRouter.post("/add-home-stock", addHomeStock);

module.exports = homeStockRouter;