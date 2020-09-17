import User from "../models/User.js";

export const post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user.id });
  } catch (err) {
    res.status(400).json({});
  }
};
