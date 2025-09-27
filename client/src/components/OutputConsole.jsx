import { ChevronUp } from 'lucide-react';

const OutputConsole = ({ isExpanded, onToggle, content, isLoading }) => {
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
      <div
        className={`overflow-auto bg-[#1E1E1E] font-mono text-sm text-gray-300 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="p-4 whitespace-pre-wrap">
          {isLoading ? 'Loading...' : content || 'Click "Run" to compile the smart contract.'}
        </div>
      </div>
    </div>
  );
};

export default OutputConsole;