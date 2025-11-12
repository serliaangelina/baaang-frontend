import type { FeeConfig } from '../types';

interface FeeConfigurationProps {
  config?: FeeConfig;
  onChange: (config: FeeConfig) => void;
  isLoading: boolean;
}

export const FeeConfiguration = ({ config, onChange, isLoading }: FeeConfigurationProps) => {
  const feeType = config?.type || 'static';
  const feeTier = config?.tier || 1;

  const handleTypeChange = (type: 'static' | 'dynamic') => {
    onChange({ ...config, type, tier: type === 'static' ? feeTier : undefined });
  };

  const handleTierChange = (tier: 1 | 2 | 3) => {
    onChange({ ...config, type: feeType, tier });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-dark-900 mb-6 pb-3 border-b-2 border-dark-900">
        Fee Configuration
      </h2>

      <div className="space-y-6">
        <div>
          <label className="label">Fee Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleTypeChange('static')}
              disabled={isLoading}
              className={`py-3 px-6 rounded-lg font-semibold border-2 border-dark-900 transition-all ${
                feeType === 'static'
                  ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                  : 'bg-white text-dark-900 hover:bg-cream-50'
              }`}
            >
              Static
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('dynamic')}
              disabled={isLoading}
              className={`py-3 px-6 rounded-lg font-semibold border-2 border-dark-900 transition-all ${
                feeType === 'dynamic'
                  ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                  : 'bg-white text-dark-900 hover:bg-cream-50'
              }`}
            >
              Dynamic 3%
            </button>
          </div>
          <p className="mt-2 text-xs text-dark-800">
            {feeType === 'static'
              ? 'Fixed fee structure'
              : 'Adaptive fee based on market conditions (3% max)'}
          </p>
        </div>

        {feeType === 'static' && (
          <div>
            <label className="label">Fee Tier</label>
            <div className="grid grid-cols-3 gap-4">
              {([1, 2, 3] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleTierChange(tier)}
                  disabled={isLoading}
                  className={`py-3 px-6 rounded-lg font-semibold border-2 border-dark-900 transition-all ${
                    feeTier === tier
                      ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                      : 'bg-white text-dark-900 hover:bg-cream-50'
                  }`}
                >
                  {tier}%
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-dark-800">
              Select the fee percentage for liquidity pool transactions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
