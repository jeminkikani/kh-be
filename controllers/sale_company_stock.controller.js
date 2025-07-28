const SaleCompanyStock = require("../models/sale_company_stock.model");

exports.addSaleCompanyStock = async (req, res) => {
  try {
    const { company_id, date, gold_24kt, gold_18kt, conversion_rate } = req.body;
    const saleCompanyStock = await SaleCompanyStock.create({
      company_id,
      date,
      gold_24kt,
      gold_18kt,
      conversion_rate,
    });
    res.status(201).json({
      message: "Sale company stock added successfully",
      saleCompanyStock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStock = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({ is_deleted: false });
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockById = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.findById(req.params.id);
    if (!saleCompanyStock) {
      return res.status(404).json({ message: "Sale company stock not found" });
    }
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateSaleCompanyStock = async (req, res) => {
  try {
    const { gold_24t, gold_18kt } = req.body;
    const saleCompanyStock = await SaleCompanyStock.findByIdAndUpdate(
      req.params.id,
      {
        gold_24t,
        gold_18kt,
      }
    );
    res.status(200).json({
      message: "Sale company stock updated successfully",
      saleCompanyStock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteSaleCompanyStock = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.findByIdAndUpdate(
      req.params.id,
      {
        is_deleted: true,
      }
    );
    res.status(200).json({
      message: "Sale company stock deleted successfully",
      saleCompanyStock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.clearSaleCompanyStock = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.findByIdAndUpdate(
      req.params.id,
      {
        is_cleared: true,
      }
    );
    res.status(200).json({
      message: "Sale company stock cleared successfully",
      saleCompanyStock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockByCompanyId = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({
      company_id: req.params.id,
    });
    if (!saleCompanyStock) {
      return res.status(404).json({ message: "Sale company stock not found" });
    }
    res.status(200).json({ message: "Sale company stock found", data: saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockByCompanyIdAndDate = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({
      company_id: req.params.id,
      date: req.params.date,
    });
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockByCompanyIdAndDateAndGold24t = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({
      company_id: req.params.id,
      date: req.params.date,
      gold_24t: req.params.gold_24t,
    });
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockByCompanyIdAndDateAndGold18kt = async (req, res) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({
      company_id: req.params.id,
      date: req.params.date,
      gold_18kt: req.params.gold_18kt,
    });
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getSaleCompanyStockByCompanyIdAndDateAndGold24tAndGold18kt = async (
  req,
  res
) => {
  try {
    const saleCompanyStock = await SaleCompanyStock.find({
      company_id: req.params.id,
      date: req.params.date,
      gold_24t: req.params.gold_24t,
      gold_18kt: req.params.gold_18kt,
    });
    res.status(200).json({ saleCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
