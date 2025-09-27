import { ChevronUp } from 'lucide-react';

const OutputConsole = ({ isExpanded, onToggle }) => {
  return (
    <div className="border-t border-gray-700 flex-shrink-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-2 text-sm text-gray-400 bg-[#1E1E1E] hover:bg-gray-700 transition-colors"
      >
        <span>&gt; Output Console</span>
        <ChevronUp
          size={16}
          className={`transform transition-transform duration-300 ${
            isExpanded ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </button>
      {/* Collapsible content area */}
      <div
        className={`overflow-auto bg-[#1E1E1E] font-mono text-sm text-gray-300 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="p-4">
            <p><span className="text-green-400">$</span> forge build</p>
            <p>[<span className="text-blue-400">[]</span>] Compiling...</p>
            <p>[<span className="text-blue-400">[]</span>] Compiling 1 files with 0.8.19</p>
            <p>[<span className="text-blue-400">[]</span>] Solc 0.8.19 finished in 234.56ms</p>
            <p><span className="text-green-400">✓</span> Compiler run successful</p>
            <br />
            <p><span className="text-green-400">$</span> forge deploy StorageRegistry --rpc-url testnet</p>
            <p>Deploying StorageRegistry...</p>
            <p><span className="text-green-400">✓</span> Contract deployed!</p>
            <p><span className="text-green-400">✓</span> Address: <span className="text-gray-400">0x742d35Cc6634C0532925a3b844Bc454e4438f4a</span></p>
        </div>
      </div>
    </div>
  );
};

export default OutputConsole;