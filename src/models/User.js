import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().required().lowercase(),
  password: Joi.string().required().min(6),
});

export default userSchema;
