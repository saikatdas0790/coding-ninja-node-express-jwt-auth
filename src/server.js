import sirv from "sirv";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as sapper from "@sapper/server";
import sequelize from "./sequelize";
import { checkUser, requireAuth } from "./middleware/authMiddleware";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();
app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  express.json(),
  cookieParser(),
);

app
  .use(
    sapper.middleware({
      session: async (req, res) => {
        let user;
        if (res.locals.user) user = res.locals.user;
        else user = await checkUser(req, res);

        return {
          user,
        };
      },
    }),
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });
// sequelize.sync();
