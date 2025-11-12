import type { DeployTokenRequest, DeployTokenResponse, IPFSUploadResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async deployToken(data: DeployTokenRequest): Promise<DeployTokenResponse> {
    const response = await fetch(`${API_BASE_URL}/api/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to deploy token');
    }

    return response.json();
  },

  async uploadImageFromUrl(url: string): Promise<IPFSUploadResponse> {
    const response = await fetch(`${API_BASE_URL}/api/upload/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    return response.json();
  },

  async uploadImageFile(file: File): Promise<IPFSUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload/file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file');
    }

    return response.json();
  },

  async getHealth(): Promise<{ success: boolean; status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },
};
