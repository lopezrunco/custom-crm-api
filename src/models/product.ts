import mongoose, { Schema } from "mongoose";

import IProduct from "../interfaces/product.interface";

const productchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String },
  description: { type: String },
  brand: { type: String },
  productModel: { type: String },
  capacity: { type: Number },
  filterType: { type: String },
  filterLife: { type: Number },
  dimensions: {
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number },
  },
  weight: { type: Number },
  warranty: { type: Boolean },
  warrantyPeriod: { type: Number },
  energyConsumption: { type: Number },
  features: { type: String },
  images: [{ url: { type: String } }],
  currency: { type: String, required: true, enum: ["UYU", "USD"] },
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", productchema);
