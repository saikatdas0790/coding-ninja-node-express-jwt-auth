import admin from "firebase-admin";

import serviceAccount from "../coding-ninja-node-express-jwt-auth.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://coding-ninja-node-express-jwt-auth-learning-projects-277612-e2e.firebaseio.com/",
});

export default admin;
