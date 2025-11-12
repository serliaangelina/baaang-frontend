export interface TokenMetadata {
  description?: string;
  telegram?: string;
  website?: string;
  twitter?: string;
  farcaster?: string;
}

export interface RewardRecipient {
  recipient: string;
  admin: string;
  bps: number;
  token: 'Paired' | 'Both' | 'Clanker';
}

export interface FeeConfig {
  type: 'static' | 'dynamic';
  tier?: 1 | 2 | 3;
}

export interface PoolConfig {
  type: 'Recommended' | 'Legacy';
  startingMarketCap?: number;
}

export interface DeployTokenRequest {
  name: string;
  symbol: string;
  deployerAddress: string; // User's connected wallet address
  rewardTokenType?: 'Paired' | 'Clanker' | 'Both'; // Type of token for user's 60% reward
  image?: string;
  metadata?: TokenMetadata;
  feeConfig?: FeeConfig;
  poolConfig?: PoolConfig;
  rewards?: RewardRecipient[];
  vaultConfig?: {
    percentage: number;
    lockupDuration: number;
    vestingDuration: number;
    recipient?: string;
  };
  devBuyAmount?: number;
}

export interface DeployTokenResponse {
  success: boolean;
  tokenAddress?: string;
  clankerWorldUrl?: string;
  transactionHash?: string;
  error?: string;
}

export interface IPFSUploadResponse {
  success: boolean;
  ipfsUrl?: string;
  error?: string;
}

export type DeploymentStatus = 'idle' | 'uploading' | 'deploying' | 'success' | 'error';
