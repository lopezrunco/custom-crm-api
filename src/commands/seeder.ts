require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

import logging from "../config/logging";
import { getDbConnectionString } from "../utils/getDBConnectionString";

import { SeedingUser } from "../interfaces/seedingUser.interface";
import { SeedingProduct } from "../interfaces/seedingProduct.interface";
import { SeedingSale } from "../interfaces/seedingSale.interface";

import User from "../models/user";
import Product from "../models/product";
import Sale from "../models/sale";

const usersToSeed: number = 5;
const users: SeedingUser[] = [];

const productsToSeed: number = 5;
const products: SeedingProduct[] = [];

const salesToSeed: number = 10;
const sales: SeedingSale[] = [];

const generateUsers = (usersToSeed: number) => {
  const randomRoles = ["CUSTOMER", "VENDOR", "INSTALLER"];
  const userPassword: string | undefined = bcrypt.hashSync("pass123", 2);

  logging.info(`${usersToSeed} users to seed...`);

  for (let userIteration = 0; userIteration < usersToSeed; userIteration++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: userPassword,
      role:
        userIteration < 1
          ? "SUPER"
          : randomRoles[Math.floor(Math.random() * randomRoles.length)], // First user is SUPER, then, asign the role randomly.
      mfaEnabled: false,
      mfaSecret: "",
      tel: faker.phone.number(),
      address: faker.location.streetAddress(),
      intersection: faker.location.secondaryAddress(),
      neighborhood: faker.location.secondaryAddress(),
      observations: faker.location.secondaryAddress(),
      billing: {
        rs: faker.company.name(),
        rut: faker.number.int(),
        address: faker.location.streetAddress(),
      },
      profileImageUrl: faker.image.avatar(),
    });
  }

  return users;
};

const generateProducts = (productsToSeed: number) => {
  logging.info(`${productsToSeed} products to seed...`);

  for (
    let productIteration = 0;
    productIteration < productsToSeed;
    productIteration++
  ) {
    let randomImages = [];

    for (let imageIteration = 0; imageIteration < 3; imageIteration++) {
      randomImages.push({ url: faker.image.urlLoremFlickr() });
    }

    products.push({
      name: faker.commerce.product(),
      category: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      brand: faker.company.name(),
      productModel: faker.commerce.productAdjective(),
      capacity: faker.number.int(100),
      filterType: faker.commerce.productMaterial(),
      filterLife: faker.number.int({ max: 5 }),
      dimensions: {
        height: faker.number.int({ max: 1000 }),
        width: faker.number.int({ max: 1000 }),
        depth: faker.number.int({ max: 1000 }),
      },
      weight: faker.number.int({ max: 1000 }),
      warranty: true,
      warrantyPeriod: faker.number.int({ max: 5 }),
      energyConsumption: faker.number.int({ max: 5000 }),
      features: faker.commerce.productDescription(),
      images: randomImages,
      currency: "USD",
      price: faker.commerce.price(),
    });
  }
};

const generateSales = (salesToSeed: number) => {
  logging.info(`${salesToSeed} sales to seed...`);

  let productsIds = [];

  for (
    let productIdsIteration = 0;
    productIdsIteration < 5;
    productIdsIteration++
  ) {
    productsIds.push('66f516c0a65ef0b67a298b29');
  }

  for (let saleIteration = 0; saleIteration < salesToSeed; saleIteration++) {
    sales.push({
      customerId: '66f516c0a65ef0b67a298b29',
      sellerId: '66f516c0a65ef0b67a298b29',
      paymentMethod: "CASH",
      currency: "USD",
      price: faker.commerce.price(),
      commission: faker.commerce.price(),
      delivery: {
        fromTimestamp: faker.date.future(),
        toTimestamp: faker.date.future(),
        installer: '66f516c0a65ef0b67a298b29',
      },
      products: productsIds,
      benefit: faker.lorem.paragraph(),
      observations: faker.lorem.paragraph(),
    });
  }
};

export const seedData = async () => {
  logging.info("Running data seed...");

  try {
    const dbConnectionString = getDbConnectionString() as string;
    await mongoose.connect(dbConnectionString);

    await generateUsers(usersToSeed);
    await generateProducts(productsToSeed);
    await generateSales(salesToSeed);

    await User.insertMany(users);
    await Product.insertMany(products);
    await Sale.insertMany(sales);

    logging.info("Done!");
  } catch (error) {
    logging.error(`Error connecting to database: ${error}`);
  } finally {
    await mongoose.connection.close();
  }
};

seedData();
