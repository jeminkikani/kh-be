const home_stock = require("../models/home_stock.model");
const AddCompanyStock = require("../models/add_company_stock.model");

const addHomeStock = async (req, res) => {
    try {
        const { date, add_by, gold_24kt, conversion_rate, gold_18kt, is_approved } = req.body;
        if(add_by) {
            const add_by_user = await home_stock.findById(add_by);
            if(add_by_user) {
                return res.status(404).json({ message: "entry already inserted found." });
            }
        }
        const newHomeStock = new home_stock({
            date,
            add_by,
            gold_24kt,
            conversion_rate,
            is_approved,
            gold_18kt
        });
        const savedHomeStock = await newHomeStock.save();
        const updateAddCompanyStock = await AddCompanyStock.updateOne({ _id: add_by }, { $set: { is_approved: true } } );
        res.status(201).json({ message: "Home stock added successfully", savedHomeStock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addHomeStock };