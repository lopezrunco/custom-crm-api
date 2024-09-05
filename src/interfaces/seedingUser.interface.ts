export interface SeedingUser {
  name: string;
  email: string;
  password: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  role: string;
}
