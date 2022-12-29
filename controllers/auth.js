const authService = require("../services/auth_service");

module.exports.registerUser = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        console.log(req.body)
        let data = req.body;
        //* data validation
        let result = await authService.createUser(data);
        if(result) {
            res.send(true);
            // Login and return Or let login from front-end.
        } else {
            res.send(false);
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
        //* data validation
        let responseData = await authService.login(data);
        if(responseData) {
            res.send({status: true, data: responseData});
            // send user info and token
        } else {
            res.send(false);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}

