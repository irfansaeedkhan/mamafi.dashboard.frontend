export interface User {
  Email: string;
  Name: string;
  Surname: string;
  AffiliateCode: string;
  WalletAddress: string;
  PasswordResetAt: string;
  // JWT payload fields
  sub?: string; // User ID
  emailVerified?: boolean;
  is_admin?: boolean;
  is_demo?: boolean;
  is_rewards_enabled?: boolean;
  iat?: number; // Issued at
  exp?: number; // Expires at
}
