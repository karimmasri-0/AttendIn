const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const access_token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    jwt.verify(access_token,"huss123", { expiresIn: 10000 }, (err, token_decoded) => {
  if (err) {
    return res.status(401).json({ message: 'Token expired' });
  }
  if(token_decoded.Role==2 || token_decoded.Role=='2'){
    next();
  }
  else{
    return res.json({ message: 'Not Allowed' });
  }
});

};

module.exports = verifyToken;