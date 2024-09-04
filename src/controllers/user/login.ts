const bcrypt = require("bcrypt");
const otplib = require("otplib");

import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";
import { returnCredentials } from "../../utils/returnCredentials";

import User from "../../models/user";

module.exports = (req: RequestType, res: ResponseType) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        const match = bcrypt.compareSync(req.body.password, user.password);

        if (match) {
          if (user.mfaEnabled) {
            try {
              // Validate the app-generated token.
              const mfaTokenValid = otplib.authenticator.check(
                req.body.token,
                user.mfaSecret
              );

              if (mfaTokenValid) {
                returnCredentials(user, res);
              } else {
                logging.error("Invalid MFA token.");
                res.status(401).end();
              }
            } catch (error) {
              logging.error("Error validating MFA token.", error);
              res.status(401).end();
            }
          } else {
            returnCredentials(user, res);
          }
        } else {
          logging.error("Password does not match.");
          res.status(401).end();
        }
      } else {
        logging.error("User not found.");
        res.status(401).end();
      }
    })
    .catch((error) => {
      logging.error(error);
      res.status(500).json({ message: "Login error." });
    });
};
