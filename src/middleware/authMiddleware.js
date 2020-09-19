import jwt from "jsonwebtoken";
import User from "../models/User";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SIGNING_SECRET, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.redirect("/login");
      } else {
        res.locals.decodedToken = decodedToken;
      }
    });
  } else {
    res.redirect("/login");
  }
  next();
};

const checkUser = async (req, res) => {
  const token = req.cookies.jwt;

  let payload;
  if (token) {
    payload = jwt.verify(token, process.env.JWT_SIGNING_SECRET);
    console.log(payload);

    try {
      let user = await User.findOne({ where: { id: payload.id } });
      res.locals.user = user.dataValues;
      return user.dataValues;
    } catch (error) {
      console.error(error.message);
    }
  } else return;

  return null;
};

export { requireAuth, checkUser };
