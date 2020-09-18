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

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SIGNING_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.error(err.message);
          res.locals.user = null;
        } else {
          let user = await User.findOne({ where: { id: decodedToken.id } });
          res.locals.user = user;
        }
      },
    );
  } else {
    res.locals.user = null;
  }
  next();
};

export { requireAuth, checkUser };
