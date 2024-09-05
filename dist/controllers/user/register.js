"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const bcrypt = require("bcrypt");
const logging_1 = __importDefault(require("../../config/logging"));
const createToken = require("../../utils/createToken");
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require("../../utils/tokenTypes");
const user_1 = __importDefault(require("../../models/user"));
module.exports = (req, res) => {
    const user = req.body;
    const schema = Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z\s]+$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(50).required(),
    });
    const validationResult = schema.validate(user);
    if (!validationResult.error) {
        user.password = bcrypt.hashSync(user.password, 2);
        user_1.default.create({
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
            userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, "20m");
            userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, "2d");
            res.json({ user: userWithoutPassword });
        })
            .catch((error) => {
            logging_1.default.error(`Error: ${error}`);
            res.status(500).json({ message: "Could not register the user.", error });
        });
    }
    else {
        logging_1.default.error(`Error: ${validationResult.error}`);
        res.status(400).json({ message: validationResult.error });
    }
};
//# sourceMappingURL=register.js.map