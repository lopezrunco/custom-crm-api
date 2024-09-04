require("dotenv").config();

const mongoose = require("mongoose");
import { Error } from "mongoose";
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

import { getDbConnectionString } from "../utils/geDBConnectionString";
import User from '../models/user'

interface SeedingUser {
  name: string;
  email: string;
  password: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  role: string;
}

const usersToSeed = 10
const users: SeedingUser[] = [];
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

console.log("-------------------------------------");
console.log("Running data seed...");
console.log(`${usersToSeed} users to seed...`);

mongoose
  .connect(getDbConnectionString())
  .then(() => {
    // Promise.all to accept a collection of promises.
    Promise.all([
      User.insertMany(users)])
    .then(() => {
      console.log("Done!");
      mongoose.connection.close();
    });
  })
  .catch((error: Error) => {
    console.error("Error connecting to database: ", error);
  });
