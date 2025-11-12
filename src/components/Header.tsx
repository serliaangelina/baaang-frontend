import { WalletConnect } from './WalletConnect';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-flame-600 via-flame-500 to-flame-600 border-b-4 border-dark-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 shadow-lg rounded-lg flex-shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md text-center md:text-left">
                BAAANG everything into Clanker.
              </h1>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};
