import mongoose, { Schema } from "mongoose";

import ISale from "../interfaces/sale.interface";

const saleSchema: Schema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: {
    type: String,
    enum: [
      "DEBIT",
      "CREDIT",
      "CASH",
      "CHECK",
      "MOBILE",
      "MERCADOPAGO",
      "TRANSFER",
    ],
    required: true,
  },
  currency: { type: String, enum: ["UYU", "USD"], required: true },
  price: { type: Number, required: true },
  commission: { type: Number, required: true },
  delivery: {
    fromTimestamp: { type: Date, required: true },
    toTimestamp: { type: Date, required: true },
    installer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  benefit: { type: String, required: false },
  observations: { type: String },
});

export default mongoose.model<ISale>("Sale", saleSchema);
