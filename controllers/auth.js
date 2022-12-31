const authService = require("../services/auth_service");

module.exports.registerUser = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        console.log(req.body)
        let data = req.body;
        //* data validation
        let result = await authService.createUser(data);
        if(result) {
            res.send({status: true, data: {msg: 'user registered successfully'}});
            // Login and return Or let login from front-end.
        } else {
            res.send({status: false, data: {msg: 'something went wrong'}});
        }

    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}


module.exports.login = async (req, res) => {
    // 
    try {
        // var startDate = commonDate.getCurrentDateTime();
        console.log(req.body)
        let data = req.body;
        // validation
        let validationStatus = true;
        let validationMsg = ''
        if (!data.gst_no){
            validationStatus = false;
            validationMsg = 'gst_no is mandatory';
        }
        else if (!data.password){
            validationStatus = false;
            validationMsg = 'password is mandatory';
        }
        if(!validationStatus){
            res.send({status:false, data: {msg: validationMsg}})
            return false;
        }
        
        //* data validation
        let responseData = await authService.login(data);
        if(responseData) {
            if (responseData == 'gst not found'){
                res.send({status:false, data: {msg: 'gst no not found'}})
            } 
            if (responseData == 'unauthenticated'){
                res.send({status:false, data: {msg: 'unauthenticated'}})
            }
            res.send({status: true, data: responseData});
            // send user info and token
        } else {
            res.send({status: false, data: {msg: 'something went wrong'}});
        }

    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}

module.exports.verifyEmail = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        let data = req.body;
        if (!data.otp){
            res.send({status: false, data: {msg: 'otp is mandatory'}});
            return false;
        }
        
        if(data.otp == 9999) {
            res.send({status: true, data: {msg: 'email verified successfully'}});
            // Login and return Or let login from front-end.
        } else {
            res.send({status: false, data: {msg: 'otp does not match'}});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}
module.exports.verifyMobile = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        let data = req.body;
        if (!data.otp){
            res.send({status: false, data: {msg: 'otp is mandatory'}});
            return false;
        }
        
        if(data.otp == 9999) {
            res.send({status: true, data: {msg: 'mobile verified successfully'}});
            // Login and return Or let login from front-end.
        } else {
            res.send({status: false, data: {msg: 'otp does not match'}});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}
