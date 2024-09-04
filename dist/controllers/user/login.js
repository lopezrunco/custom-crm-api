"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const otplib = require("otplib");
const logging_1 = __importDefault(require("../../config/logging"));
const returnCredentials_1 = require("../../utils/returnCredentials");
const user_1 = __importDefault(require("../../models/user"));
module.exports = (req, res) => {
    user_1.default.findOne({
        email: req.body.email,
    })
        .then((user) => {
        if (user) {
            const match = bcrypt.compareSync(req.body.password, user.password);
            if (match) {
                if (user.mfaEnabled) {
                    try {
                        // Validate the app-generated token.
                        const mfaTokenValid = otplib.authenticator.check(req.body.token, user.mfaSecret);
                        if (mfaTokenValid) {
                            (0, returnCredentials_1.returnCredentials)(user, res);
                        }
                        else {
                            logging_1.default.error("Invalid MFA token.");
                            res.status(401).end();
                        }
                    }
                    catch (error) {
                        logging_1.default.error("Error validating MFA token.", error);
                        res.status(401).end();
                    }
                }
                else {
                    (0, returnCredentials_1.returnCredentials)(user, res);
                }
            }
            else {
                logging_1.default.error("Password does not match.");
                res.status(401).end();
            }
        }
        else {
            logging_1.default.error("User not found.");
            res.status(401).end();
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        res.status(500).json({ message: "Login error." });
    });
};
//# sourceMappingURL=login.js.map