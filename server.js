const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// ------------------- Custom Middleware -------------------

// 1️⃣ Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// 2️⃣ Authentication Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const validKey = '12345'; // You can put this in .env later
  if (apiKey !== validKey) {
    return res.status(401).json({ message: 'Unauthorized. Invalid or missing API key.' });
  }
  next();
};

// 3️⃣ Validation Middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number.' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be true or false.' });
  }

  next();
};

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product API 🚀');
});

// Sample in-memory database
let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Headphones',
    description: 'Noise-cancelling headphones',
    price: 300,
    category: 'electronics',
    inStock: false
  }
];

app.use('/api/products', authenticate);

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product by ID
app.put('/api/products/:id', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products[productIndex] = { ...products[productIndex], name, description, price, category, inStock };
  res.json(products[productIndex]);
});

// DELETE product by ID
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted', product: deletedProduct });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
