import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      unique: {
        args: [true],
        msg: "That email is already registered",
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: "Please enter a valid email",
        },
        isLowercase: true,
        notEmpty: {
          args: [true],
          msg: "Please enter an email",
        },
        notNull: {
          args: [true],
          msg: "Please enter an email",
        },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Minimum password length is 6 characters",
        },
        notEmpty: {
          args: [true],
          msg: "Please enter a password",
        },
        notNull: {
          args: [true],
          msg: "Please enter a password",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) =>
        (user.password = await bcrypt.hash(user.password, 10)),
    },
    sequelize,
    modelName: "User",
  },
);

export default User;
