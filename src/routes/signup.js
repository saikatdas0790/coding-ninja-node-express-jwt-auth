import User from "../models/User.js";

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  for (const error of err.errors) {
    errors[error.path] = error.message;
  }

  return errors;
};

export const post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user.toJSON());
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};
