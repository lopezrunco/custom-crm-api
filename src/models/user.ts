import mongoose, { Schema } from "mongoose";

import IUser from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, enum: ['CUSTOMER', 'VENDOR', 'INSTALLER', 'SUPER'], trim: true },
  mfaEnabled: { type: Boolean, required: false },
  mfaSecret: { type: String, required: false },
  tel: { type: String, required: false, trim: true },
  address: { type: String, required: false, trim: true },
  intersection: { type: String, required: false, trim: true },
  neighborhood: { type: String, required: false, trim: true },
  observations: { type: String, required: false, trim: true },
  billing: {
    rs: { type: String, required: false, trim: true },
    rut: { type: Number, required: false, unique: true, trim: true },
    address: { type: String, required: false, trim: true },
  },
  profileImageUrl: { type: String, required: false, trim: true }
});

export default mongoose.model<IUser>("User", userSchema);
