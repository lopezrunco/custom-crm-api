import { Document } from "mongoose";

export default interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  refreshToken: string;
  mfaEnabled: boolean;
  mfaSecret: string;
}
