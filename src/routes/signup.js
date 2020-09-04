import User from "../models/User.js";
import firebaseAdmin from "../firebase.js";
import md5 from "crypto-js/md5";

const db = firebaseAdmin.database();

export const post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error, value } = await User.validate({ email, password });

    if (error) throw error;

    const ref = await db.ref(`users/${md5(email)}`);
    const response = await ref.once("value", async (data) => {
      if (!data.val()) {
        await db.ref(`users/${md5(email)}`).set(value);
        res.statusCode = 200;
        res.end(JSON.stringify({ id: data.key, ...value }));
      } else {
        res.statusCode = 200;
        res.end("Email already exists");
      }
    });
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
