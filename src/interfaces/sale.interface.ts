import { Document } from "mongoose";

import { PaymentMethod } from "paymentMethods.type";
import { Currency } from "currency.type";
import IUser from "./user.interface";
import IProduct from "./product.interface";

export default interface ISale extends Document {
    customerId: IUser["_id"]; 
    sellerId: IUser["_id"]; 
    paymentMethod: PaymentMethod;
    currency: Currency; 
    price: number; 
    commission: number; 
    delivery: {
        fromTimestamp: Date;
        toTimestamp: Date;
        installer: IUser["_id"];
    };
    products: IProduct["_id"][]; 
    benefit: string; 
    observations: string;
}
