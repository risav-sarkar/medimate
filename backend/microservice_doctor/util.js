const jwt = require("jsonwebtoken");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./serviceaccount.json");
initializeApp({
  credential: cert(serviceAccount),
});

module.exports.verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.getTokenData = async (req) => {
  const authHeader = req.headers["authorization"];

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    return tokenData;
  } else {
    return null;
  }
};
