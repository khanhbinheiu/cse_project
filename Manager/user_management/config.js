const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usermanagement_tut',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Kết nối MySQL thất bại: ', err);
        return;
    }
    console.log('✅ Kết nối MySQL thành công!');
});

module.exports = connection;
