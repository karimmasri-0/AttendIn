const jwt_decode = require("jwt-decode");

const verifyToken = (req, res, next) => {
    const access_token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!access_token) {
        return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt_decode(access_token);
    if (decoded.Role == 1 || decoded.Role == '1') {
        return next();
    }
    else {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = verifyToken;