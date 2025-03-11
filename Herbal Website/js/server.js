const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer'); 
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(express.static('uploads')); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Kết nối tới MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '24032004Zz@', 
  database: 'herbal_store' 
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error retrieving products' });
    }
    res.status(200).json(results); 
  });
});

app.post('/products', upload.single('productImage'), (req, res) => {
  const { productName, productPriceKg, productPriceGr, productQuantity, productCategory, productDescription } = req.body;
  const productImage = req.file ? `/uploads/${req.file.filename}` : ''; 

  const sql = 'INSERT INTO products (name, price_kg, price_g, quantity, category, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [productName, productPriceKg, productPriceGr, productQuantity, productCategory, productDescription, productImage], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error inserting product' });
    }
    res.status(201).send({ message: 'Product added successfully!' }); 
  });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const cors = require('cors');
app.use(cors()); 

