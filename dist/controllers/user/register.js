"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const bcrypt = require("bcrypt");
const logging_1 = __importDefault(require("../../config/logging"));
const createToken = require("../../utils/createToken");
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require("../../utils/tokenTypes");
const { allowedCharactersPattern } = require('../../utils/validationPatterns');
const user_1 = __importDefault(require("../../models/user"));
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingEmail = yield user_1.default.findOne({ email: user.email });
        if (existingEmail) {
            return res.status(409).json({ message: `The email ${user.email} is already in use.` });
        }
        user.password = bcrypt.hashSync(user.password, 2);
        user_1.default.create({
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
});
//# sourceMappingURL=register.js.map