"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
const logging_1 = __importDefault(require("../../config/logging"));
const { allowedCharactersPattern } = require('../../utils/validationPatterns');
const product_1 = __importDefault(require("../../models/product"));
module.exports = (req, res) => {
    const product = req.body;
    const schema = Joi.object({
        name: Joi.string().pattern(allowedCharactersPattern).required(),
        category: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        description: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        brand: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        productModel: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        capacity: Joi.number().allow(null, ''),
        filterType: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        filterLife: Joi.number().allow(null, ''),
        dimensions: Joi.object({
            height: Joi.number().allow(null, ''),
            width: Joi.number().allow(null, ''),
            depth: Joi.number().allow(null, ''),
        }).allow(null, ''),
        weight: Joi.number().allow(null, ''),
        warranty: Joi.boolean().allow(null, ''),
        warrantyPeriod: Joi.number().allow(null, ''),
        energyConsumption: Joi.number().allow(null, ''),
        features: Joi.string().pattern(allowedCharactersPattern).allow(null, ''),
        images: Joi.array().items(Joi.object({
            url: Joi.string().uri()
        }).allow(null, '')),
        currency: Joi.string().valid("UYU", "USD"),
        price: Joi.number().required()
    });
    const validationResult = schema.validate(product);
    if (!validationResult.error) {
        const { height, width, depth } = product.dimensions || {};
        product_1.default.create({
            name: product.name,
            category: product.category,
            description: product.description,
            brand: product.brand,
            productModel: product.productModel,
            capacity: product.capacity,
            filterType: product.filterType,
            filterLife: product.filterLife,
            dimensions: {
                height: height,
                width: width,
                depth: depth,
            },
            weight: product.weight,
            warranty: product.warranty,
            warrantyPeriod: product.warrantyPeriod,
            energyConsumption: product.energyConsumption,
            features: product.features,
            images: product.images,
            currency: product.currency,
            price: product.price
        })
            .then((product) => {
            res.status(200).json({
                message: `Product with id ${product._id} created.`,
            });
        })
            .catch((error) => {
            res.status(500).json({
                message: `Could not create the new product: ${error}`
            });
        });
    }
    else {
        logging_1.default.error(`Error: ${validationResult.error}`);
        res.status(400).json({ message: validationResult.error });
    }
};
//# sourceMappingURL=create.js.map