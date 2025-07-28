const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getCompanyDashboardData,
  getDashboardDataByDateRange,
} = require("../controllers/dashboard.controller");

// Get dashboard data for all companies
router.get("/", getDashboardData);

// Get dashboard data for a specific company
router.get("/company/:company_id", getCompanyDashboardData);

// Get dashboard data with date range filter
router.get("/filter", getDashboardDataByDateRange);

module.exports = router; 