import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

export const post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};
