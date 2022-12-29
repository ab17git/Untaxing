const jwt = require("jsonwebtoken");

module.exports.authentication = function(req, res, next){
    try {
        console.log('In authentication middleware')
        const nonSecurePaths = ['/', '/login', '/registerUser', '/test'];
        if (nonSecurePaths.includes(req.path)) {
            console.log('Non Secure Paths');
            next()
        }
        else {
            console.log('Secure Paths');
            verifyAuthToken(req, res, next);
        }
    } catch(e){
        console.log(e.message)
        res.status(500).send(e.message)
    }
}

verifyAuthToken = (req, res, next) => {
    let token = req.headers["auth-token"];
    console.log(token)
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.user_id = decoded.id;
        next();
    });
};
