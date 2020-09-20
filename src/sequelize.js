import { Sequelize } from "sequelize";

let sequelize;

const dbPort = process.env.DB_PORT || "5432";

const connectionString = process.env.DB_HOST.includes("cloudsql")
  ? `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@/${process.env.DB_NAME}?host=${process.env.DB_HOST}`
  : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${dbPort}/${process.env.DB_NAME}`;

console.log(connectionString);

if (!sequelize) {
  sequelize = new Sequelize(connectionString);
}

export default sequelize;
