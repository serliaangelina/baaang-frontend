import { useState, type ChangeEvent } from 'react';
import { api } from '../api/client';

interface ImageUploadProps {
  onImageUploaded: (ipfsUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload = ({ onImageUploaded, currentImage }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const result = await api.uploadImageFile(file);
      if (result.success && result.ipfsUrl) {
        onImageUploaded(result.ipfsUrl);
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="card">
      <label className="label">Token Image</label>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-dark-900 file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-2 file:border-dark-900
                   file:text-sm file:font-semibold
                   file:bg-cream-50 file:text-dark-900
                   hover:file:bg-cream-100 file:cursor-pointer
                   cursor-pointer"
        />
        {uploading && (
          <p className="mt-2 text-sm text-flame-700 font-medium">Uploading to IPFS...</p>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border-2 border-red-900 rounded-lg">
          <p className="text-sm text-red-900 font-medium">{error}</p>
        </div>
      )}

      {currentImage && (
        <div className="mt-4">
          <p className="text-sm font-bold text-green-900 mb-3">Image Uploaded</p>
          <div className="relative rounded-lg overflow-hidden border-2 border-dark-900">
            <img
              src={currentImage}
              alt="Token"
              className="w-full h-auto max-h-96 object-contain bg-dark-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};
