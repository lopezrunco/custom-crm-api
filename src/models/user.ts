import mongoose, { Schema } from "mongoose";

import IUser from "../interfaces/user";

const userSchema: Schema = new Schema({
  userId: { type: String, unique: true, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  mfaEnabled: { type: Boolean, required: false },
  mfaSecret: { type: String, required: false },
});

export default mongoose.model<IUser>("User", userSchema);
