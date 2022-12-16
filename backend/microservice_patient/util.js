const jwt = require("jsonwebtoken");

module.exports.getTokenData = async (req) => {
  const authHeader = req.headers["authorization"];

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenData);
    return tokenData;
  } else {
    return null;
  }
};
