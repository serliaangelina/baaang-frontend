import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import type { DeployTokenRequest, TokenMetadata, RewardRecipient, FeeConfig, PoolConfig } from '../types';
import { ImageUpload } from './ImageUpload';
import { TokenMetadataForm } from './TokenMetadata';
import { RewardRecipientsForm } from './RewardRecipients';
import { FeeConfiguration } from './FeeConfiguration';
import { PoolConfiguration } from './PoolConfiguration';
import { RewardTokenSelector } from './RewardTokenSelector';
import { useWallet } from '../contexts/WalletContext';

interface DeploymentFormProps {
  onSubmit: (data: DeployTokenRequest) => void;
  isLoading: boolean;
}

export const DeploymentForm = ({ onSubmit, isLoading }: DeploymentFormProps) => {
  const { address, isConnected } = useWallet();
  const [formData, setFormData] = useState<DeployTokenRequest>({
    name: '',
    symbol: '',
    deployerAddress: '',
    rewardTokenType: 'Paired', // Default to WETH
    image: '',
    metadata: {},
    feeConfig: { type: 'static', tier: 1 },
    poolConfig: { type: 'Recommended', startingMarketCap: 10 },
    rewards: [],
    devBuyAmount: 0,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showVault, setShowVault] = useState(false);

  // Auto-fill deployerAddress with connected wallet address
  useEffect(() => {
    if (address && isConnected) {
      setFormData((prev) => ({ ...prev, deployerAddress: address }));
    }
  }, [address, isConnected]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Require wallet connection
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVaultChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      vaultConfig: {
        ...prev.vaultConfig,
        percentage: prev.vaultConfig?.percentage || 0,
        lockupDuration: prev.vaultConfig?.lockupDuration || 0,
        vestingDuration: prev.vaultConfig?.vestingDuration || 0,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-dark-900 mb-6 pb-3 border-b-2 border-dark-900">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Token Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Token"
              required
              className="input-field"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="label">Token Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="MTK"
              required
              className="input-field"
              disabled={isLoading}
            />
          </div>
        </div>

        {!isConnected && (
          <div className="mt-6 p-4 bg-flame-50 border-2 border-flame-700 rounded-lg">
            <p className="text-sm text-flame-900 font-bold">
              Please connect your wallet to deploy a token
            </p>
            <p className="text-xs text-flame-800 mt-1">
              Your connected wallet will receive 60% of pool rewards
            </p>
          </div>
        )}

        {isConnected && address && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-900 rounded-lg">
            <p className="text-sm font-bold text-green-900 mb-2">Connected Wallet</p>
            <p className="text-xs text-green-800 font-mono break-all">
              {address}
            </p>
            <p className="text-xs text-green-800 mt-2">
              This address will receive 60% of pool rewards
            </p>
          </div>
        )}

      </div>

      <ImageUpload
        onImageUploaded={(ipfsUrl) => setFormData((prev) => ({ ...prev, image: ipfsUrl }))}
        currentImage={formData.image}
      />

      <TokenMetadataForm
        metadata={formData.metadata}
        onChange={(metadata: TokenMetadata) => setFormData((prev) => ({ ...prev, metadata }))}
        isLoading={isLoading}
      />

      <FeeConfiguration
        config={formData.feeConfig}
        onChange={(feeConfig: FeeConfig) => setFormData((prev) => ({ ...prev, feeConfig }))}
        isLoading={isLoading}
      />

      <PoolConfiguration
        config={formData.poolConfig}
        onChange={(poolConfig: PoolConfig) => setFormData((prev) => ({ ...prev, poolConfig }))}
        isLoading={isLoading}
      />

      <RewardTokenSelector
        value={formData.rewardTokenType || 'Paired'}
        onChange={(rewardTokenType) => setFormData((prev) => ({ ...prev, rewardTokenType }))}
        tokenSymbol={formData.symbol}
        isLoading={isLoading}
      />

      <RewardRecipientsForm
        recipients={formData.rewards}
        onChange={(rewards: RewardRecipient[]) => setFormData((prev) => ({ ...prev, rewards }))}
        isLoading={isLoading}
      />

      <div className="card">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-xl font-bold text-dark-900">Advanced Options</h2>
          <span className="text-2xl text-flame-700 font-bold">
            {showAdvanced ? '−' : '+'}
          </span>
        </button>

        {showAdvanced && (
          <div className="mt-6 space-y-6 pt-6 border-t-2 border-dark-900">
            {/* Dev Buy disabled - user would need to pay ETH
            <div>
              <label className="label">Dev Buy Amount (ETH)</label>
              <input
                type="number"
                name="devBuyAmount"
                value={formData.devBuyAmount}
                onChange={handleChange}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="input-field"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-dark-800">
                Amount of ETH to buy tokens immediately after deployment
              </p>
            </div>
            */}

            <div className="pt-6 border-t-2 border-dark-900">
              <div className="flex items-center justify-between mb-4">
                <label className="label mb-0">Vault Configuration</label>
                <button
                  type="button"
                  onClick={() => setShowVault(!showVault)}
                  className="text-sm font-bold text-flame-700 hover:text-flame-800"
                >
                  {showVault ? 'Remove Vault' : 'Add Vault'}
                </button>
              </div>

              {showVault && (
                <div className="space-y-4 p-4 bg-cream-50 rounded-lg border-2 border-dark-900">
                  <div>
                    <label className="label text-xs">Percentage (%)</label>
                    <input
                      type="number"
                      value={formData.vaultConfig?.percentage || 0}
                      onChange={(e) => handleVaultChange('percentage', Number(e.target.value))}
                      placeholder="10"
                      min="0"
                      max="100"
                      className="input-field"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="label text-xs">Lockup Duration (seconds)</label>
                    <input
                      type="number"
                      value={formData.vaultConfig?.lockupDuration || 0}
                      onChange={(e) => handleVaultChange('lockupDuration', Number(e.target.value))}
                      placeholder="86400"
                      min="0"
                      className="input-field"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="label text-xs">Vesting Duration (seconds)</label>
                    <input
                      type="number"
                      value={formData.vaultConfig?.vestingDuration || 0}
                      onChange={(e) => handleVaultChange('vestingDuration', Number(e.target.value))}
                      placeholder="604800"
                      min="0"
                      className="input-field"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="label text-xs">Recipient Address (Optional)</label>
                    <input
                      type="text"
                      value={formData.vaultConfig?.recipient || ''}
                      onChange={(e) => handleVaultChange('recipient', e.target.value)}
                      placeholder="0x... (defaults to token admin)"
                      className="input-field font-mono"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !isConnected}
        className="btn-primary w-full text-lg py-4"
      >
        {isLoading ? 'Deploying Token...' : !isConnected ? 'Connect Wallet First' : 'Deploy Token'}
      </button>
    </form>
  );
};
