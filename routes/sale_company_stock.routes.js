const express = require("express");
const SaleCompanyStockRouter = express.Router();
const {
  addSaleCompanyStock,
  getSaleCompanyStock,
  getSaleCompanyStockById,
  updateSaleCompanyStock,
  deleteSaleCompanyStock,
  clearSaleCompanyStock,
} = require("../controllers/sale_company_stock.controller");

SaleCompanyStockRouter.post("/add-sale-company-stock", addSaleCompanyStock);
SaleCompanyStockRouter.get("/get-sale-company-stock", getSaleCompanyStock);
SaleCompanyStockRouter.get(
  "/get-sale-company-stock-by-id/:id",
  getSaleCompanyStockById
);
SaleCompanyStockRouter.put(
  "/update-sale-company-stock/:id",
  updateSaleCompanyStock
);
SaleCompanyStockRouter.delete(
  "/delete-sale-company-stock/:id",
  deleteSaleCompanyStock
);
SaleCompanyStockRouter.put(
  "/clear-sale-company-stock/:id",
  clearSaleCompanyStock
);

module.exports = SaleCompanyStockRouter;
