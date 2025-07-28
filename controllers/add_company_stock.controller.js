const AddCompanyStock = require("../models/add_company_stock.model");

exports.addCompanyStock = async (req, res) => {
  try {
    const { company_id, date, gold_24kt, gold_18kt, conversion_rate } = req.body;
    const addCompanyStock = await AddCompanyStock.create({
      company_id,
      date,
      gold_24kt,
      gold_18kt,
      conversion_rate,
    });
    res
      .status(201)
      .json({ message: "Company stock added successfully", addCompanyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getCompanyStock = async (req, res) => {
  try {
    const companyStock = await AddCompanyStock.find({ is_deleted: false });
    res.status(200).json({ companyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getCompanyStockById = async (req, res) => {
  try {
    const companyStock = await AddCompanyStock.findById(req.params.id);
    res.status(200).json({ companyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateCompanyStock = async (req, res) => {
  try {
    const { gold_24t, gold_18kt } = req.body;
    const companyStock = await AddCompanyStock.findByIdAndUpdate(
      req.params.id,
      {
        gold_24t,
        gold_18kt,
      }
    );
    res
      .status(200)
      .json({ message: "Company stock updated successfully", companyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteCompanyStock = async (req, res) => {
  try {
    const companyStock = await AddCompanyStock.findByIdAndUpdate(
      req.params.id,
      {
        is_deleted: true,
      }
    );
    res
      .status(200)
      .json({ message: "Company stock deleted successfully", companyStock });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

