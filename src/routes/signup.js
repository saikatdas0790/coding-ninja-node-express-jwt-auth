import jwt from "jsonwebtoken";
import User from "../models/User.js";

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  for (const error of err.errors) {
    errors[error.path] = error.message;
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGNING_SECRET, {
    expiresIn: maxAge,
  });
};

const post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.locals.user = user.dataValues;
    res.status(201).redirect("/");
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export { post, handleErrors, createToken, maxAge };
