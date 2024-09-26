import { PaymentMethod } from "paymentMethods.type";
import { Currency } from "currency.type";

export interface SeedingSale {
    customerId: string; 
    sellerId: string; 
    paymentMethod: PaymentMethod;
    currency: Currency; 
    price: number; 
    commission: number; 
    delivery: {
        fromTimestamp: Date;
        toTimestamp: Date;
        installer: string;
    };
    products: string[]; 
    benefit: string; 
    observations: string;
}
