const jwt = require("jsonwebtoken");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./serviceaccount.json");
const admin = require("firebase-admin");
const fs = require("fs");

initializeApp({
  credential: cert(serviceAccount),
});

module.exports.verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return { email: decodedToken.email, uid: decodedToken.uid };
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

module.exports.getFirestoreData = (req) => {
  const collectionRef = admin.firestore().collection("hehehehe");

  collectionRef
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No documents found in the collection.");
        return;
      }
      let list = [];
      // Iterate through the documents
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });

      const filePath = "response.txt";
      const jsonData = JSON.stringify(list, null, 2);
      fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Response saved to", filePath);
        }
      });
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};
