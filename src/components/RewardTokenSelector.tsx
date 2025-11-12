interface RewardTokenSelectorProps {
  value: 'Paired' | 'Clanker' | 'Both';
  onChange: (value: 'Paired' | 'Clanker' | 'Both') => void;
  tokenSymbol: string;
  isLoading: boolean;
}

export const RewardTokenSelector = ({ value, onChange, tokenSymbol, isLoading }: RewardTokenSelectorProps) => {
  const displaySymbol = tokenSymbol || 'TOKEN';

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-dark-900 mb-3">Your Reward Token Type</h2>
      <p className="text-sm text-dark-800 mb-4">
        Choose how you want to receive your 60% pool rewards
      </p>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onChange('Paired')}
          disabled={isLoading}
          className={`py-3 px-4 rounded-lg font-bold border-2 border-dark-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            value === 'Paired'
              ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
              : 'bg-cream-50 text-dark-900 hover:bg-cream-100'
          }`}
        >
          <div className="text-center">
            <p className="text-lg">WETH</p>
            <p className="text-xs mt-1 opacity-90">Paired Token</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('Clanker')}
          disabled={isLoading}
          className={`py-3 px-4 rounded-lg font-bold border-2 border-dark-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            value === 'Clanker'
              ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
              : 'bg-cream-50 text-dark-900 hover:bg-cream-100'
          }`}
        >
          <div className="text-center">
            <p className="text-lg">${displaySymbol}</p>
            <p className="text-xs mt-1 opacity-90">Your Token</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('Both')}
          disabled={isLoading}
          className={`py-3 px-4 rounded-lg font-bold border-2 border-dark-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            value === 'Both'
              ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
              : 'bg-cream-50 text-dark-900 hover:bg-cream-100'
          }`}
        >
          <div className="text-center">
            <p className="text-lg">Both</p>
            <p className="text-xs mt-1 opacity-90">WETH + ${displaySymbol}</p>
          </div>
        </button>
      </div>

      <div className="mt-4 p-3 bg-cream-100 border-2 border-dark-900 rounded-lg">
        <p className="text-xs text-dark-800">
          <strong>Note:</strong> The platform owner receives 40% in WETH. You control your 60% reward and can choose the token type.
        </p>
      </div>
    </div>
  );
};
