const Joi = require("joi");
const bcrypt = require("bcrypt");

import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";
const createToken = require("../../utils/createToken");
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require("../../utils/tokenTypes");
const { allowedCharactersPattern } = require('../../utils/validationPatterns')

import User from "../../models/user";

module.exports = async (req: RequestType, res: ResponseType) => {
  const user = req.body;

  const schema = Joi.object({
    name: Joi.string().pattern(allowedCharactersPattern).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(50).required(),
    mfaEnabled: Joi.boolean().optional(),
    mfaSecret: Joi.string().optional(),
    tel: Joi.string().optional(),
    address: Joi.string().optional(),
    intersection: Joi.string().optional(),
    neighborhood: Joi.string().optional(),
    observations: Joi.string().optional(),
    billing: Joi.object({
      rs: Joi.string().optional(),
      rut: Joi.number().optional().allow(null, ''),
      address: Joi.string().optional(),
    }).optional(),
    profileImageUrl: Joi.string().uri().optional(),
  });

  const validationResult = schema.validate(user);

  if (!validationResult.error) {
    const existingEmail = await User.findOne({ email: user.email })

    if (existingEmail) {
      return res.status(409).json({ message: `The email ${user.email} is already in use.` });
    }

    user.password = bcrypt.hashSync(user.password, 2);

    User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: "CUSTOMER",
      mfaEnabled: user.mfaEnabled,
      mfaSecret: user.mfaSecret,
      tel: user.tel,
      address: user.address,
      intersection: user.intersection,
      neighborhood: user.neighborhood,
      observations: user.observations,
      billing: user.billing,
      profileImageUrl: user.profileImageUrl,
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
