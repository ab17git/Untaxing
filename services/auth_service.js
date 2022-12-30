const dbConnection = require('../utilities/dbConnection');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports.createUser = async function (data) {
    try {
        return new Promise(async (resolve, reject) => {

            let password = data.password;
            await bcrypt.hash(data.password, saltRounds).then(function(hash) {
                password = hash;
            });
            // password = await bcrypt.hash(data.password, saltRounds)
            console.log(data)
            let sql1 = "INSERT INTO users (name, gst_no, email, mob_no, password) VALUES(?, ?, ?, ?, ?)";
            let params = [data.name, data.gst_no, data.email, data.mob_no, password]
            console.log(params)

            dbConnection.query(sql1, params, function (err, result) {
                if (err) {
                    console.log('here in error')
                    console.log(err.sqlMessage);
                    console.log(err.message);
                    resolve(0);
                } else {
                    console.log(result)
                    if (result) {
                        // let user_id = result.insertId;
                        resolve(1)
                    } else {
                        resolve(0);
                    }
                }
            });
        });
    } catch (e) {
        console.log(e);
        // return 0;
    }
};

module.exports.login = async function (data) {
    try {
        return new Promise(async (resolve, reject) => { 
            // 
            let gst_no = data.gst_no;
            let password = data.password;
            let user = await getUserByGstNo(gst_no);
            console.log(user)
            
            // compare password
            let passwordCheck = false
            await bcrypt.compare(password, user.password).then(function(result) {
                passwordCheck = result;
            });
            console.log(passwordCheck)
            // resolve(passwordCheck)
            if (!passwordCheck) {
                resolve(false)
            }

            // send Token and users
            var token = jwt.sign({ id: user.id, gst_no: user.gst_no }, process.env.AUTH_SECRET, {
                expiresIn: '365d' // 365 days (86400) 24 hours
            });
            let responseData = {token: token, user: user}
            resolve(responseData);

        });
    } catch (e) {
        console.log(e);
        // return 0;
    }
};

const getUserByGstNo = async function (gst_no) {
    try {
        return new Promise(async (resolve, reject) => { 

            let sql1 = " SELECT * FROM users " +
                       " WHERE gst_no = ?";

            dbConnection.query(sql1, [gst_no], function (err, rows, fields) {
                if (err) {
                    console.log(err.sqlMessage);
                    reject(err.sqlMessage);
                } else {
                    if (rows.length > 0) {
                        // check
                        resolve(rows[0]);
                    } else {
                        resolve(0);
                    }
                }
            });
        });
    } catch (e) {
        console.log(e);
        // return 0;
    }
};