const Joi = require("joi");
const bcrypt = require("bcrypt");

import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";
const createToken = require("../../utils/createToken");
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require("../../utils/tokenTypes");

import User from "../../models/user";

module.exports = (req: RequestType, res: ResponseType) => {
  const user = req.body;

  const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(50).required(),
  });

  const validationResult = schema.validate(user);

  if (!validationResult.error) {
    user.password = bcrypt.hashSync(user.password, 2);

    User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: "CUSTOMER",
    })
      .then((user) => {
        // Obtain the user in plain.
        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password;
        delete userWithoutPassword.mfaSecret;

        userWithoutPassword.token = createToken(
          user,
          CONSUMER_TOKEN_TYPE,
          "20m"
        );
        userWithoutPassword.refreshToken = createToken(
          user,
          REFRESH_TOKEN_TYPE,
          "2d"
        );

        res.json({ user: userWithoutPassword });
      })
      .catch((error) => {
        logging.error(`Error: ${error}`)
        res.status(500).json({ message: "Could not register the user.", error });
      });
  } else {
    logging.error(`Error: ${validationResult.error}`)
    res.status(400).json({ message: validationResult.error });
  }
};
