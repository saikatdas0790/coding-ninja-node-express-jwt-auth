import User from "../models/User.js";
import { handleErrors, createToken, maxAge } from "./signup.js";

export const post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user.dataValues.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.locals.user = user.dataValues;
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
