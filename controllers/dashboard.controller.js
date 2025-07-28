const AddCompanyStock = require("../models/add_company_stock.model");
const SaleCompanyStock = require("../models/sale_company_stock.model");
const Company = require("../models/company.model");

// Get dashboard data for all companies in a single object
const getDashboardData = async (req, res) => {
  try {
    const companies = await Company.find({ is_deleted: false });
    const companiesData = [];
    let totalAdded24kt = 0;
    let totalAdded18kt = 0;
    let totalSold24kt = 0;
    let totalSold18kt = 0;

    for (const company of companies) {
      // Calculate total added stock
      const totalAddedStock = await AddCompanyStock.aggregate([
        {
          $match: {
            company_id: company._id,
            is_deleted: false,
          },
        },
        {
          $group: {
            _id: null,
            total_24kt: { $sum: "$gold_24kt" },
            total_18kt: { $sum: "$gold_18kt" },
          },
        },
      ]);

      // Calculate total sold stock
      const totalSoldStock = await SaleCompanyStock.aggregate([
        {
          $match: {
            company_id: company._id,
            is_deleted: false,
          },
        },
        {
          $group: {
            _id: null,
            total_24kt: { $sum: "$gold_24kt" },
            total_18kt: { $sum: "$gold_18kt" },
          },
        },
      ]);

      const added24kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_24kt : 0;
      const added18kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_18kt : 0;
      const sold24kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_24kt : 0;
      const sold18kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_18kt : 0;

      const currentStock24kt = added24kt - sold24kt;
      const currentStock18kt = added18kt - sold18kt;

      // Add to totals
      totalAdded24kt += added24kt;
      totalAdded18kt += added18kt;
      totalSold24kt += sold24kt;
      totalSold18kt += sold18kt;

      const companyData = {
        company_id: company._id,
        company_name: company.company_name,
        company_address: company.company_address,
        company_phone: company.company_phone,
        gst_number: company.gst_number,
        total_added_24kt: added24kt,
        total_added_18kt: added18kt,
        total_sold_24kt: sold24kt,
        total_sold_18kt: sold18kt,
        current_stock_24kt: currentStock24kt,
        current_stock_18kt: currentStock18kt,
        difference_24kt: currentStock24kt,
        difference_18kt: currentStock18kt,
        total_difference: currentStock24kt + currentStock18kt,
      };

      companiesData.push(companyData);
    }

    // Calculate overall totals
    const totalCurrentStock24kt = totalAdded24kt - totalSold24kt;
    const totalCurrentStock18kt = totalAdded18kt - totalSold18kt;
    const totalDifference = totalCurrentStock24kt + totalCurrentStock18kt;

    // Create single dashboard object
    const dashboardData = {
      summary: {
        total_companies: companies.length,
        total_added_24kt: totalAdded24kt,
        total_added_18kt: totalAdded18kt,
        total_sold_24kt: totalSold24kt,
        total_sold_18kt: totalSold18kt,
        total_current_stock_24kt: totalCurrentStock24kt,
        total_current_stock_18kt: totalCurrentStock18kt,
        total_difference_24kt: totalCurrentStock24kt,
        total_difference_18kt: totalCurrentStock18kt,
        grand_total_difference: totalDifference,
      },
      companies: companiesData,
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get dashboard data for a specific company
const getCompanyDashboardData = async (req, res) => {
  try {
    const { company_id } = req.params;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const company = await Company.findById(company_id);
    if (!company || company.is_deleted) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Calculate total added stock for the company
    const totalAddedStock = await AddCompanyStock.aggregate([
      {
        $match: {
          company_id: company._id,
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total_24kt: { $sum: "$gold_24kt" },
          total_18kt: { $sum: "$gold_18kt" },
        },
      },
    ]);

    // Calculate total sold stock for the company
    const totalSoldStock = await SaleCompanyStock.aggregate([
      {
        $match: {
          company_id: company._id,
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total_24kt: { $sum: "$gold_24kt" },
          total_18kt: { $sum: "$gold_18kt" },
        },
      },
    ]);

    const added24kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_24kt : 0;
    const added18kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_18kt : 0;
    const sold24kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_24kt : 0;
    const sold18kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_18kt : 0;

    const currentStock24kt = added24kt - sold24kt;
    const currentStock18kt = added18kt - sold18kt;

    const dashboardData = {
      company_id: company._id,
      company_name: company.company_name,
      company_address: company.company_address,
      company_phone: company.company_phone,
      gst_number: company.gst_number,
      total_added_24kt: added24kt,
      total_added_18kt: added18kt,
      total_sold_24kt: sold24kt,
      total_sold_18kt: sold18kt,
      current_stock_24kt: currentStock24kt,
      current_stock_18kt: currentStock18kt,
      difference_24kt: currentStock24kt,
      difference_18kt: currentStock18kt,
      total_difference: currentStock24kt + currentStock18kt,
    };

    res.status(200).json({
      success: true,
      message: "Company dashboard data retrieved successfully",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching company dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get dashboard data with date range filter
const getDashboardDataByDateRange = async (req, res) => {
  try {
    const { start_date, end_date, company_id } = req.query;

    let matchCondition = { is_deleted: false };
    
    if (company_id) {
      matchCondition.company_id = company_id;
    }

    if (start_date && end_date) {
      matchCondition.date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    }

    const companies = company_id 
      ? await Company.find({ _id: company_id, is_deleted: false })
      : await Company.find({ is_deleted: false });

    const dashboardData = [];

    for (const company of companies) {
      // Calculate total added stock with date filter
      const addedMatchCondition = { ...matchCondition, company_id: company._id };
      const totalAddedStock = await AddCompanyStock.aggregate([
        { $match: addedMatchCondition },
        {
          $group: {
            _id: null,
            total_24kt: { $sum: "$gold_24kt" },
            total_18kt: { $sum: "$gold_18kt" },
          },
        },
      ]);

      // Calculate total sold stock with date filter
      const soldMatchCondition = { ...matchCondition, company_id: company._id };
      const totalSoldStock = await SaleCompanyStock.aggregate([
        { $match: soldMatchCondition },
        {
          $group: {
            _id: null,
            total_24kt: { $sum: "$gold_24kt" },
            total_18kt: { $sum: "$gold_18kt" },
          },
        },
      ]);

      const added24kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_24kt : 0;
      const added18kt = totalAddedStock.length > 0 ? totalAddedStock[0].total_18kt : 0;
      const sold24kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_24kt : 0;
      const sold18kt = totalSoldStock.length > 0 ? totalSoldStock[0].total_18kt : 0;

      const currentStock24kt = added24kt - sold24kt;
      const currentStock18kt = added18kt - sold18kt;

      const dashboardItem = {
        company_id: company._id,
        company_name: company.company_name,
        company_address: company.company_address,
        company_phone: company.company_phone,
        gst_number: company.gst_number,
        total_added_24kt: added24kt,
        total_added_18kt: added18kt,
        total_sold_24kt: sold24kt,
        total_sold_18kt: sold18kt,
        current_stock_24kt: currentStock24kt,
        current_stock_18kt: currentStock18kt,
        difference_24kt: currentStock24kt,
        difference_18kt: currentStock18kt,
        total_difference: currentStock24kt + currentStock18kt,
        date_range: start_date && end_date ? { start_date, end_date } : null,
      };

      dashboardData.push(dashboardItem);
    }

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data by date range:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
  getCompanyDashboardData,
  getDashboardDataByDateRange,
}; 