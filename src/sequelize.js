import { Sequelize } from "sequelize";

let sequelize;
const connectionString = `postgres://${process.env.DB_USER}:${
  process.env.DB_PASS
}@${
  process.env.NODE_ENV === "production"
    ? `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    : process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!sequelize) {
  sequelize = new Sequelize(connectionString);
}

export default sequelize;
