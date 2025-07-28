const Company = require("../models/company.model");

exports.createCompany = async (req, res) => {
  try {
    const { company_name, company_phone, company_address, gst_number } =
      req.body;
    const company = await Company.create({
      company_name,
      company_phone,
      company_address,
      gst_number: gst_number ? gst_number : null,
    });
    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ is_deleted: false });
    res.status(200).json({ companies });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { company_name, company_phone, company_address, gst_number } =
      req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        company_name,
        company_phone,
        company_address,
        gst_number: gst_number ? gst_number : null,
      },
      { new: true }
    );
    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, {
      is_deleted: true,
    });
    res.status(200).json({ message: "Company deleted successfully", company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
