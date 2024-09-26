import { Document } from "mongoose";

import { UserRole } from "userRole.type";

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  token: string;
  refreshToken: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  tel: string;
  address: string;
  intersection: string;
  neighborhood: string;
  observations: string;
  billing: {
    rs: string;
    rut: number;
    address: string;
  },
  profileImageUrl: string;
}
