const express = require("express");
const companyRouter = express.Router();
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");

companyRouter.post("/add-company", createCompany);
companyRouter.get("/get-companies", getCompanies);
companyRouter.get("/get-by-id/:id", getCompanyById);
companyRouter.put("/update/:id", updateCompany);
companyRouter.delete("/delete/:id", deleteCompany);

module.exports = companyRouter;
