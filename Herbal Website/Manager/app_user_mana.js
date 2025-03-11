const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Đổi nếu có user khác
    password: "24032004Zz@",  // Đổi nếu có mật khẩu
    database: "product_management"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Kết nối MySQL thành công!");
});

// Lấy danh sách thuốc
app.get("/api/herbals", (req, res) => {
    db.query("SELECT * FROM herbals", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Thêm thuốc mới
app.post("/api/herbals", (req, res) => {
    const { name, amount, supplier_email, supplier_phone, image_url, category, storage } = req.body;
    db.query("INSERT INTO herbals (name, amount, supplier_email, supplier_phone, image_url, category, storage) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, amount, supplier_email, supplier_phone, image_url, category, storage],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Thêm thuốc thành công!", id: result.insertId });
        }
    );
});

// Xóa thuốc
app.delete("/api/herbals/:id", (req, res) => {
    db.query("DELETE FROM herbals WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Xóa thành công!" });
    });
});

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});
