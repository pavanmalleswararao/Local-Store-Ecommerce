require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParse: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Database connection error:", err));

const productSchema = new mongoose.Schema({
    name: String,
    desciption: String,
    price: Number,
    imageUrl: String,
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));