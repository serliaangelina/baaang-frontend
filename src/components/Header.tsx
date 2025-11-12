import { WalletConnect } from './WalletConnect';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-flame-600 via-flame-500 to-flame-600 border-b-4 border-dark-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-16 h-16 shadow-lg rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">
                BAAANG everything into Clanker.
              </h1>
            </div>
          </div>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};
