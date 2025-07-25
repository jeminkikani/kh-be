require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const stockRouter = require('./routes/sale_stock.routes');
const cors = require('cors');
const shopRouter = require('./routes/shop.routes');
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
