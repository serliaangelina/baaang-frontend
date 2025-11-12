import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export const WalletConnect = () => {
  const { address, isConnected, isConnecting, connect, disconnect, error } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const handleConnect = async (walletType: 'metamask' | 'walletconnect' | 'farcaster') => {
    await connect(walletType);
    setShowModal(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="relative w-full md:w-auto">
        <button
          onClick={() => setShowModal(!showModal)}
          className="w-full md:w-auto bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-700 hover:to-flame-600 text-white font-bold py-2.5 px-4 md:py-2 md:px-4 rounded-lg border-2 border-dark-900 shadow-md transition-all text-sm md:text-base"
        >
          {formatAddress(address)}
        </button>
        {showModal && (
          <div className="absolute right-0 mt-2 w-full md:w-64 bg-white border-2 border-dark-900 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <p className="text-sm text-dark-800 font-medium mb-2">Connected Address:</p>
              <p className="text-xs text-dark-900 font-mono break-all mb-4 bg-cream-100 p-2 rounded border border-dark-900">
                {address}
              </p>
              <button
                onClick={() => {
                  disconnect();
                  setShowModal(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-dark-900 transition-all"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isConnecting}
        className="w-full md:w-auto bg-gradient-to-br from-flame-700 to-flame-500 hover:from-flame-800 hover:to-flame-600 text-white font-bold py-2.5 px-6 md:py-2 md:px-6 rounded-lg border-2 border-dark-900 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-cream-50 border-4 border-dark-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-900">Connect Wallet</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-dark-900 hover:text-flame-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-900 rounded-lg">
                <p className="text-sm text-red-900 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handleConnect('metamask')}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 bg-white hover:bg-cream-100 border-2 border-dark-900 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="text-left flex-1">
                  <p className="text-dark-900 font-bold">MetaMask</p>
                  <p className="text-dark-800 text-sm">Connect using MetaMask</p>
                </div>
              </button>

              <button
                onClick={() => handleConnect('farcaster')}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 bg-white hover:bg-cream-100 border-2 border-dark-900 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  F
                </div>
                <div className="text-left flex-1">
                  <p className="text-dark-900 font-bold">Farcaster Wallet</p>
                  <p className="text-dark-800 text-sm">Connect using Farcaster</p>
                </div>
              </button>

              <button
                onClick={() => handleConnect('walletconnect')}
                disabled={isConnecting}
                className="w-full flex items-center gap-4 p-4 bg-white hover:bg-cream-100 border-2 border-dark-900 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  W
                </div>
                <div className="text-left flex-1">
                  <p className="text-dark-900 font-bold">WalletConnect</p>
                  <p className="text-dark-800 text-sm">Scan with mobile wallet</p>
                </div>
              </button>
            </div>

            <p className="text-xs text-dark-800 mt-4 text-center">
              By connecting a wallet, you agree to deploy tokens on Base network
            </p>
          </div>
        </div>
      )}
    </>
  );
};
