export interface SeedingUser {
  name: string;
  email: string;
  password: string;
  role: string;
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
