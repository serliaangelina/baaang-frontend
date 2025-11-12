import type { CSSProperties } from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  const spinnerStyle: CSSProperties = {
    animationDirection: 'reverse',
    animationDuration: '1s'
  };
  return (
    <div className="card text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-cream-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-flame-700 border-l-flame-700 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-flame-500 border-r-flame-500 animate-spin" style={spinnerStyle}></div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-dark-900 mb-2">
            {message || 'Processing...'}
          </h3>
          <p className="text-dark-800 font-medium">
            This may take a few moments
          </p>
        </div>
      </div>
    </div>
  );
};
