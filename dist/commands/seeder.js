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
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const logging_1 = __importDefault(require("../config/logging"));
const getDBConnectionString_1 = require("../utils/getDBConnectionString");
const user_1 = __importDefault(require("../models/user"));
const usersToSeed = 10;
const users = [];
const userPassword = bcrypt.hashSync("pass123", 2);
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Running data seed...");
    logging_1.default.info(`${usersToSeed} users to seed...`);
    try {
        const dbConnectionString = (0, getDBConnectionString_1.getDbConnectionString)();
        yield mongoose.connect(dbConnectionString);
        for (let userIteration = 0; userIteration < usersToSeed; userIteration++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: userPassword,
                mfaEnabled: false,
                mfaSecret: "",
                role: userIteration < 2 ? "VENDOR" : "CUSTOMER", // First users are Vendors, the rest Customers.
            });
        }
        yield user_1.default.insertMany(users);
        logging_1.default.info("Done!");
    }
    catch (error) {
        logging_1.default.error(`Error connecting to database: ${error}`);
    }
    finally {
        yield mongoose.connection.close();
    }
});
seedData();
//# sourceMappingURL=seeder.js.map