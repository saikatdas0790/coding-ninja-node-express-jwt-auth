import sirv from "sirv";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as sapper from "@sapper/server";
import sequelize from "./sequelize";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

express()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    express.json(),
    cookieParser(),
    sapper.middleware(),
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

// sequelize.sync({ force: true });
sequelize.sync({ alter: true });
// sequelize.sync();
