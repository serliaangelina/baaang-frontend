import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import type { Address } from 'viem';

interface WalletContextType {
  address: Address | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: (walletType: 'metamask' | 'walletconnect' | 'farcaster') => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    // First try to get Farcaster context (if in miniapp)
    try {
      const context = await sdk.context;
      if (context?.user) {
        // Try to get wallet from SDK
        const wallet = await sdk.wallet.ethProvider.request({
          method: 'eth_accounts',
        }) as string[];

        if (wallet && wallet.length > 0) {
          setAddress(wallet[0] as Address);
          return;
        }
      }
    } catch (err) {
      // Not in Farcaster miniapp, continue to check ethereum
    }

    // Fallback to standard ethereum provider
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
        if (accounts.length > 0) {
          setAddress(accounts[0] as Address);
        }
      } catch (err) {
        console.error('Error checking connection:', err);
      }
    }
  };

  const connect = async (walletType: 'metamask' | 'walletconnect' | 'farcaster') => {
    setIsConnecting(true);
    setError(null);

    try {
      if (walletType === 'metamask') {
        await connectMetaMask();
      } else if (walletType === 'walletconnect') {
        setError('WalletConnect integration coming soon');
      } else if (walletType === 'farcaster') {
        await connectFarcaster();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Check if on Base network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
      const baseChainId = '0x2105'; // 8453 in hex

      if (chainId !== baseChainId) {
        // Switch to Base network
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: baseChainId }],
          });
        } catch (switchError: any) {
          // Chain doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: baseChainId,
                  chainName: 'Base',
                  nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://mainnet.base.org'],
                  blockExplorerUrls: ['https://basescan.org'],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      setAddress(accounts[0] as Address);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: unknown) => {
        const accountsArray = accounts as string[];
        if (accountsArray.length > 0) {
          setAddress(accountsArray[0] as Address);
        } else {
          setAddress(null);
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (err) {
      throw err;
    }
  };

  const connectFarcaster = async () => {
    try {
      // Get user context from Farcaster SDK
      const context = await sdk.context;

      if (!context?.user) {
        throw new Error('Not in Farcaster miniapp environment');
      }

      // Request wallet connection via SDK
      const wallet = await sdk.wallet.ethProvider.request({
        method: 'eth_requestAccounts',
      }) as string[];

      if (wallet && wallet.length > 0) {
        setAddress(wallet[0] as Address);
      } else {
        throw new Error('No wallet found in Farcaster account');
      }
    } catch (err) {
      console.error('Farcaster wallet error:', err);
      throw new Error('Failed to connect Farcaster wallet. Make sure you have a wallet connected to your Farcaster account.');
    }
  };

  const disconnect = () => {
    setAddress(null);
    setError(null);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
