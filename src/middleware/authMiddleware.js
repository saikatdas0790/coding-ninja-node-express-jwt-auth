import jwt from "jsonwebtoken";

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

export { requireAuth };
