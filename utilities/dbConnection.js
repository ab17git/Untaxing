let mysql      = require('mysql');

let db_config = {
    host     : process.env.MYSQL_HOSTNAME,
    database : process.env.MYSQL_DBNAME,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    connectionLimit : 10,
    charset: 'utf8mb4'
};

var pool  = mysql.createPool(db_config);

module.exports = pool;