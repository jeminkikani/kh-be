require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const stockRouter = require('./routes/sale_stock.routes');
const cors = require('cors');
const shopRouter = require('./routes/shop.routes');
const companyRouter = require('./routes/company.routes');
const AddCompanyStockRouter = require('./routes/add_company_stock.routes');
const SaleCompanyStockRouter = require('./routes/sale_company_stock.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Stock routes
app.use('/api/stocks', stockRouter);
app.use('/api/shops', shopRouter);
app.use('/api/companies', companyRouter);
app.use('/api/add-company-stock', AddCompanyStockRouter);
app.use('/api/sale-company-stock', SaleCompanyStockRouter);
app.use('/api/dashboard', dashboardRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
