import { ChangeEvent } from 'react';
import type { PoolConfig } from '../types';

interface PoolConfigurationProps {
  config?: PoolConfig;
  onChange: (config: PoolConfig) => void;
  isLoading: boolean;
}

export const PoolConfiguration = ({ config, onChange, isLoading }: PoolConfigurationProps) => {
  const poolType = config?.type || 'Recommended';
  const startingMarketCap = config?.startingMarketCap || 10;

  const handleTypeChange = (type: 'Recommended' | 'Legacy') => {
    // Clanker Recommended always uses 10 ETH (fixed)
    const newMarketCap = type === 'Recommended' ? 10 : startingMarketCap;
    onChange({ ...config, type, startingMarketCap: newMarketCap });
  };

  const handleMarketCapChange = (value: number) => {
    onChange({ ...config, type: poolType, startingMarketCap: value });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-dark-900 mb-6 pb-3 border-b-2 border-dark-900">
        Pool Configuration
      </h2>

      <div className="space-y-6">
        <div>
          <label className="label">Pool Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleTypeChange('Recommended')}
              disabled={isLoading}
              className={`py-3 px-6 rounded-lg font-semibold border-2 border-dark-900 transition-all ${
                poolType === 'Recommended'
                  ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                  : 'bg-white text-dark-900 hover:bg-cream-50'
              }`}
            >
              Clanker Recommended
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('Legacy')}
              disabled={isLoading}
              className={`py-3 px-6 rounded-lg font-semibold border-2 border-dark-900 transition-all ${
                poolType === 'Legacy'
                  ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                  : 'bg-white text-dark-900 hover:bg-cream-50'
              }`}
            >
              Legacy
            </button>
          </div>
          <p className="mt-2 text-xs text-dark-800">
            {poolType === 'Recommended'
              ? 'Multi-position optimized configuration (5-7 positions). Clanker will automatically handle the liquidity distribution.'
              : 'Full-range single position. Traditional pool setup with liquidity across all price ranges.'}
          </p>
        </div>

        <div>
          <label className="label">Starting Market Cap (ETH)</label>
          <input
            type="number"
            value={startingMarketCap}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleMarketCapChange(Number(e.target.value))
            }
            placeholder="10"
            min="0.1"
            step="0.1"
            className="input-field"
            disabled={isLoading || poolType === 'Recommended'}
          />
          <p className="mt-2 text-xs text-dark-800">
            {poolType === 'Recommended'
              ? 'Fixed at 10 ETH for Clanker Recommended configuration.'
              : 'Initial market cap in ETH. Clanker provides liquidity via bonding curve - no need to have ETH in your wallet.'}
          </p>
        </div>
      </div>
    </div>
  );
};
