import { ChangeEvent } from 'react';
import type { RewardRecipient } from '../types';

interface RewardRecipientsProps {
  recipients?: RewardRecipient[];
  onChange: (recipients: RewardRecipient[]) => void;
  isLoading: boolean;
}

export const RewardRecipientsForm = ({ recipients = [], onChange, isLoading }: RewardRecipientsProps) => {
  const addRecipient = () => {
    const newRecipient: RewardRecipient = {
      recipient: '',
      admin: '',
      bps: 5000,
      token: 'Paired',
    };
    onChange([...recipients, newRecipient]);
  };

  const removeRecipient = (index: number) => {
    onChange(recipients.filter((_, i) => i !== index));
  };

  const updateRecipient = (index: number, field: keyof RewardRecipient, value: string | number) => {
    const updated = [...recipients];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const totalBps = recipients.reduce((sum, r) => sum + r.bps, 0);
  const isValid = totalBps === 10000;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-dark-900">
        <h2 className="text-2xl font-bold text-dark-900">
          Reward Recipients (Optional)
        </h2>
        <button
          type="button"
          onClick={addRecipient}
          disabled={isLoading}
          className="text-sm font-bold px-4 py-2 rounded-lg bg-flame-700 text-white hover:bg-flame-800 border-2 border-dark-900 disabled:opacity-50"
        >
          + Add Recipient
        </button>
      </div>

      {recipients.length > 0 && (
        <>
          <div className="space-y-6">
            {recipients.map((recipient, index) => (
              <div key={index} className="p-4 bg-cream-50 rounded-lg border-2 border-dark-900">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-dark-900 uppercase tracking-wide">
                    Recipient #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeRecipient(index)}
                    disabled={isLoading}
                    className="text-sm font-bold text-red-700 hover:text-red-900 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label text-xs">Recipient Address</label>
                    <input
                      type="text"
                      value={recipient.recipient}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateRecipient(index, 'recipient', e.target.value)
                      }
                      placeholder="0x..."
                      className="input-field font-mono text-sm"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="label text-xs">Admin Address</label>
                    <input
                      type="text"
                      value={recipient.admin}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateRecipient(index, 'admin', e.target.value)
                      }
                      placeholder="0x..."
                      className="input-field font-mono text-sm"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="label text-xs">Reward Token</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Paired', 'Clanker', 'Both'] as const).map((tokenType) => (
                        <button
                          key={tokenType}
                          type="button"
                          onClick={() => updateRecipient(index, 'token', tokenType)}
                          disabled={isLoading}
                          className={`py-2 px-4 rounded-lg font-semibold border-2 border-dark-900 transition-all text-sm ${
                            recipient.token === tokenType
                              ? 'bg-gradient-to-br from-flame-700 to-flame-500 text-white'
                              : 'bg-white text-dark-900 hover:bg-cream-50'
                          }`}
                        >
                          {tokenType === 'Paired' ? 'WETH' : tokenType === 'Clanker' ? '$TO' : 'Both'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label text-xs">
                      Reward Percentage: {(recipient.bps / 100).toFixed(0)}%
                    </label>
                    <input
                      type="number"
                      value={recipient.bps}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateRecipient(index, 'bps', Number(e.target.value))
                      }
                      placeholder="5000"
                      min="0"
                      max="10000"
                      step="100"
                      className="input-field"
                      disabled={isLoading}
                    />
                    <p className="mt-1 text-xs text-dark-800">
                      Enter in bps (basis points). 100 bps = 1%, 10000 bps = 100%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 p-3 rounded-lg border-2 ${
            isValid ? 'bg-green-50 border-green-900' : 'bg-red-50 border-red-900'
          }`}>
            <p className={`text-sm font-bold ${
              isValid ? 'text-green-900' : 'text-red-900'
            }`}>
              Total: {(totalBps / 100).toFixed(0)}% ({totalBps} bps)
              {isValid ? ' ✓' : ' - Must equal 100% (10000 bps)'}
            </p>
          </div>
        </>
      )}

      {recipients.length === 0 && (
        <p className="text-sm text-dark-800">
          No custom recipients added. Default: 40% to owner, 60% to token admin.
        </p>
      )}
    </div>
  );
};
