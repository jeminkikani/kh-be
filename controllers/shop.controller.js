const shop = require("../models/shop.model");
const User = require("../models/user.model");

exports.loginUser = async (req, res) => {
  try {
    const { login_name, password } = req.body;
    const user = await User.findOne({
      login_name,
      password,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.is_deleted) {
      return res.status(400).json({
        message: "User is deleted",
      });
    }
    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error..",
    });
  }
};

exports.addShop = async (req, res) => {
  try {
    const { shop_name, contact_number, address } = req.body;
    const newShop = new shop({
      shop_name,
      contact_number,
      address,
    });

    const savedShop = await newShop.save();
    res.status(201).json({
      message: `shop created.! ${savedShop.shop_name}`,
      data: savedShop,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error..",
    });
  }
};

exports.getShops = async (req, res) => {
  try {
    const stocks = await shop.find({ is_deleted: { $ne: true } });
    res.status(200).json({
      message: "shops get successfully",
      data: stocks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
