let mysql      = require('mysql');

let db_config = {
    host     : process.env.MYSQL_HOSTNAME,
    database : process.env.MYSQL_DBNAME,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    port     : process.env.MYSQL_PORT,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    charset: 'utf8mb4'
};

console.log(process.env.MYSQL_HOSTNAME, process.env.MYSQL_PORT)
var pool  = mysql.createPool(db_config);

module.exports = pool;