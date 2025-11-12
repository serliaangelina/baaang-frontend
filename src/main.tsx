import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { sdk } from '@farcaster/miniapp-sdk';
import App from './App';
import './index.css';

function Root() {
  useEffect(() => {
    // Initialize Farcaster miniapp SDK
    sdk.actions.ready();
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
