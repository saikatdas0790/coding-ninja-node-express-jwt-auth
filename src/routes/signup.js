import User from "../models/User.js";
import bcrypt from "bcrypt";

export const post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error, value } = await User.validate({ email, password });

    if (error) throw error;

    const emailHash = await bcrypt.hash(email, 10);
    const passwordHash = await bcrypt.hash(password, 10);
    // const ref = await db.ref(`users/${emailHash}`);
    // const response = await ref.once("value", async (data) => {
    //   if (!data.val()) {
    //     await ref.push({ ...value, password: passwordHash });
    //     res.statusCode = 200;
    //     res.end(JSON.stringify({ id: data.key, ...value }));
    //   } else {
    //     res.statusCode = 200;
    //     res.end("Email already exists");
    //   }
    // });
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
