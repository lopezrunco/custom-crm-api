require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

import logging from "../config/logging";
import { getDbConnectionString } from "../utils/getDBConnectionString";
import { SeedingUser } from "../interfaces/seedingUser.interface";
import User from "../models/user";

const usersToSeed: number = 10;
const users: SeedingUser[] = [];
const userPassword: string | undefined = bcrypt.hashSync("pass123", 2);

export const seedData = async () => {
  logging.info("Running data seed...");
  logging.info(`${usersToSeed} users to seed...`);

  try {
    const dbConnectionString = getDbConnectionString() as string;
    await mongoose.connect(dbConnectionString);

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

    await User.insertMany(users);
    logging.info("Done!");
  } catch (error) {
    logging.error(`Error connecting to database: ${error}`);
  } finally {
    await mongoose.connection.close();
  }
};

seedData();
