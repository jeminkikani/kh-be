const express = require("express");
const AddCompanyStockRouter = express.Router();
const {
  addCompanyStock,
  getCompanyStock,
  getCompanyStockById,
  updateCompanyStock,
  deleteCompanyStock,
} = require("../controllers/add_company_stock.controller");

AddCompanyStockRouter.post("/add-company-stock", addCompanyStock);
AddCompanyStockRouter.get("/get-company-stock", getCompanyStock);
AddCompanyStockRouter.get("/get-company-stock-by-id/:id", getCompanyStockById);
AddCompanyStockRouter.put("/update-company-stock/:id", updateCompanyStock);
AddCompanyStockRouter.delete("/delete-company-stock/:id", deleteCompanyStock);

module.exports = AddCompanyStockRouter;
