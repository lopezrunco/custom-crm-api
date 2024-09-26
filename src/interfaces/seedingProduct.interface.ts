import { Currency } from "currency.type";

export interface SeedingProduct {
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
