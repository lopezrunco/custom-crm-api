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
exports.seedData = void 0;
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const logging_1 = __importDefault(require("../config/logging"));
const getDBConnectionString_1 = require("../utils/getDBConnectionString");
const user_1 = __importDefault(require("../models/user"));
const product_1 = __importDefault(require("../models/product"));
const sale_1 = __importDefault(require("../models/sale"));
const usersToSeed = 5;
const users = [];
const productsToSeed = 5;
const products = [];
const salesToSeed = 10;
const sales = [];
const generateUsers = (usersToSeed) => {
    const randomRoles = ["CUSTOMER", "VENDOR", "INSTALLER"];
    const userPassword = bcrypt.hashSync("pass123", 2);
    logging_1.default.info(`${usersToSeed} users to seed...`);
    for (let userIteration = 0; userIteration < usersToSeed; userIteration++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: userPassword,
            role: userIteration < 1
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
const generateProducts = (productsToSeed) => {
    logging_1.default.info(`${productsToSeed} products to seed...`);
    for (let productIteration = 0; productIteration < productsToSeed; productIteration++) {
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
const generateSales = (salesToSeed) => {
    logging_1.default.info(`${salesToSeed} sales to seed...`);
    let productsIds = [];
    for (let productIdsIteration = 0; productIdsIteration < 5; productIdsIteration++) {
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
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Running data seed...");
    try {
        const dbConnectionString = (0, getDBConnectionString_1.getDbConnectionString)();
        yield mongoose.connect(dbConnectionString);
        yield generateUsers(usersToSeed);
        yield generateProducts(productsToSeed);
        yield generateSales(salesToSeed);
        yield user_1.default.insertMany(users);
        yield product_1.default.insertMany(products);
        yield sale_1.default.insertMany(sales);
        logging_1.default.info("Done!");
    }
    catch (error) {
        logging_1.default.error(`Error connecting to database: ${error}`);
    }
    finally {
        yield mongoose.connection.close();
    }
});
exports.seedData = seedData;
(0, exports.seedData)();
//# sourceMappingURL=seeder.js.map