import { ChevronRight, Copy, RefreshCw, Play, LayoutGrid } from "lucide-react";

const Header = ({ onRunClick, isCompiling }) => (
  <header className="flex items-center justify-between p-2 bg-[#1A0033] rounded-t-lg flex-shrink-0">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="ml-4 text-sm text-gray-300">0g-playground</span>
    </div>
    {/* ... other header elements ... */}
    <div className="flex items-center space-x-3">
        <Copy size={20} className="text-gray-400 cursor-pointer hover:text-white"/>
        <RefreshCw size={20} className="text-gray-400 cursor-pointer hover:text-white"/>
        <button
          onClick={onRunClick}
          disabled={isCompiling}
          className="px-4 py-1.5 text-sm bg-[#5E00C0] text-white rounded-md flex items-center disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            <Play size={16} className="mr-2" />
            {isCompiling ? 'Compiling...' : 'Run'}
        </button>
    </div>
  </header>
);

export default Header;