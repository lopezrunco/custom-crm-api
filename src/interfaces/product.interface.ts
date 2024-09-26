import { Document } from "mongoose";

import { Currency } from "currency.type";

export default interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  brand: string;
  productModel: string;
  capacity: number;
  filterType: string;
  filterLife: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  weight: number;
  warranty: boolean;
  warrantyPeriod: number;
  energyConsumption: number;
  features: string;
  images: { url: string }[];
  currency: Currency;
  price: number;
}
