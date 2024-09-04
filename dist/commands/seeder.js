"use strict";
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
logging_1.default.info("Running data seed...");
logging_1.default.info(`${usersToSeed} users to seed...`);
mongoose
    .connect((0, getDBConnectionString_1.getDbConnectionString)())
    .then(() => {
    // Promise.all to accept a collection of promises.
    Promise.all([
        user_1.default.insertMany(users)
    ])
        .then(() => {
        logging_1.default.info("Done!");
        mongoose.connection.close();
    });
})
    .catch((error) => {
    logging_1.default.error(`Error connecting to database: ${error}`);
});
//# sourceMappingURL=seeder.js.map