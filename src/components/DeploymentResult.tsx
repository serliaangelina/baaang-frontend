import type { DeployTokenResponse } from '../types';

interface DeploymentResultProps {
  result: DeployTokenResponse;
  onReset: () => void;
}

export const DeploymentResult = ({ result, onReset }: DeploymentResultProps) => {
  if (!result.success) {
    return (
      <div className="card bg-red-50 border-red-900">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 mb-2">Deployment Failed</h3>
            <p className="text-red-800 font-medium">{result.error}</p>
          </div>
        </div>
        <button onClick={onReset} className="btn-secondary w-full mt-6">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="card bg-green-50 border-green-900">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-900 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-900 mb-2">Token Deployed Successfully</h3>
          <p className="text-green-800 font-medium">
            Your token has been deployed to the Base blockchain
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg border-2 border-green-900">
          <p className="text-xs font-bold text-green-900 mb-2 uppercase tracking-wide">
            Token Address
          </p>
          <p className="font-mono text-sm text-dark-900 break-all">{result.tokenAddress}</p>
        </div>

        <div className="p-4 bg-white rounded-lg border-2 border-green-900">
          <p className="text-xs font-bold text-green-900 mb-2 uppercase tracking-wide">
            Transaction Hash
          </p>
          <p className="font-mono text-sm text-dark-900 break-all">{result.transactionHash}</p>
        </div>

        {result.clankerWorldUrl && (
          <a
            href={result.clankerWorldUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg border-2 border-green-900 hover:bg-green-50 transition-colors"
          >
            <p className="text-xs font-bold text-green-900 mb-2 uppercase tracking-wide">
              View on Clanker World
            </p>
            <p className="text-sm text-dark-900 break-all font-medium">
              {result.clankerWorldUrl}
            </p>
          </a>
        )}
      </div>

      <button onClick={onReset} className="btn-primary w-full mt-6">
        Deploy Another Token
      </button>
    </div>
  );
};
