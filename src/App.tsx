import { useState } from 'react';
import { Header } from './components/Header';
import { DeploymentForm } from './components/DeploymentForm';
import { DeploymentResult } from './components/DeploymentResult';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WalletProvider } from './contexts/WalletContext';
import { api } from './api/client';
import type { DeployTokenRequest, DeployTokenResponse, DeploymentStatus } from './types';

function App() {
  const [status, setStatus] = useState<DeploymentStatus>('idle');
  const [result, setResult] = useState<DeployTokenResponse | null>(null);

  const handleDeploy = async (data: DeployTokenRequest) => {
    setStatus('deploying');
    setResult(null);

    try {
      const response = await api.deployToken(data);
      setResult(response);
      setStatus(response.success ? 'success' : 'error');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult({
        success: false,
        error: errorMessage,
      });
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-cream-200">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="card bg-gradient-to-br from-flame-700 to-flame-500 text-white border-dark-900">
            <h2 className="text-2xl font-bold mb-2">Deploy Your Token in Minutes</h2>
            <p className="text-cream-50 font-medium">
              Launch your token on Base blockchain with automatic liquidity pool setup and reward
              distribution. The owner automatically receives 40% of pool rewards.
            </p>
          </div>
        </div>

        {status === 'idle' && (
          <DeploymentForm onSubmit={handleDeploy} isLoading={false} />
        )}

        {status === 'deploying' && (
          <LoadingSpinner message="Deploying your token..." />
        )}

        {(status === 'success' || status === 'error') && result && (
          <DeploymentResult result={result} onReset={handleReset} />
        )}

        <div className="mt-8 card bg-cream-50">
          <h3 className="text-lg font-bold text-dark-900 mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm text-dark-800">
            <li className="flex items-start gap-2">
              <span className="text-flame-700 font-bold mt-0.5">•</span>
              <span>
                <strong>Automatic Rewards:</strong> 40% to owner, 60% to token admin
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-flame-700 font-bold mt-0.5">•</span>
              <span>
                <strong>Flexible Fees:</strong> Choose between static or dynamic fee structures
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-flame-700 font-bold mt-0.5">•</span>
              <span>
                <strong>Pool Strategies:</strong> Standard full-range or concentrated project positions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-flame-700 font-bold mt-0.5">•</span>
              <span>
                <strong>IPFS Integration:</strong> Decentralized image hosting for your token
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-flame-700 font-bold mt-0.5">•</span>
              <span>
                <strong>Optional Vault:</strong> Lock tokens with customizable vesting schedules
              </span>
            </li>
          </ul>
        </div>

        <footer className="mt-8 text-center text-sm text-dark-800 font-medium">
          <p>Powered by Clanker SDK v4 on Base</p>
        </footer>
      </main>
    </div>
    </WalletProvider>
  );
}

export default App;
