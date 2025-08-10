const mongoose = require("mongoose");

const home_stock_schema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    add_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddCompanyStock",
    },
    gold_24kt: {
      type: Number,
      required: true,
    },
    gold_18kt: {
      type: Number,
      required: true,
    },
    conversion_rate: {
      type: Number,
      required: true,
    },
    is_approved: {
      type: Boolean
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("homeStock", home_stock_schema);
