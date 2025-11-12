import { ChangeEvent } from 'react';
import type { TokenMetadata } from '../types';

interface TokenMetadataProps {
  metadata?: TokenMetadata;
  onChange: (metadata: TokenMetadata) => void;
  isLoading: boolean;
}

export const TokenMetadataForm = ({ metadata, onChange, isLoading }: TokenMetadataProps) => {
  const handleChange = (field: keyof TokenMetadata, value: string) => {
    onChange({
      ...metadata,
      [field]: value,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-dark-900 mb-6 pb-3 border-b-2 border-dark-900">
        Token Metadata (Optional)
      </h2>

      <div className="space-y-6">
        <div>
          <label className="label">Description</label>
          <textarea
            value={metadata?.description || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange('description', e.target.value)
            }
            placeholder="Describe your token..."
            rows={3}
            className="input-field resize-none"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="label">Telegram Link</label>
          <input
            type="url"
            value={metadata?.telegram || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('telegram', e.target.value)
            }
            placeholder="https://t.me/yourgroup"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="label">Website Link</label>
          <input
            type="url"
            value={metadata?.website || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('website', e.target.value)
            }
            placeholder="https://yourwebsite.com"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="label">X (Twitter) Link</label>
          <input
            type="url"
            value={metadata?.twitter || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('twitter', e.target.value)
            }
            placeholder="https://x.com/yourhandle"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="label">Farcaster Link</label>
          <input
            type="url"
            value={metadata?.farcaster || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('farcaster', e.target.value)
            }
            placeholder="https://farcaster.xyz/yourprofile"
            className="input-field"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
