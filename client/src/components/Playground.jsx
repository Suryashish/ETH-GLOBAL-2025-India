import { useState } from 'react';
import Header from './Header';
import OutputConsole from './OutputConsole';
import SmartContract from '../templates/SmartContract';
// ... other template imports

const Playground = ({ activeTemplate }) => {
  // State for the console
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // State for the code in the editors
  const [solidityCode, setSolidityCode] = useState(`pragma solidity ^0.8.19;

contract StorageRegistry {
    address public owner;
    string public data;

    constructor() {
        owner = msg.sender;
    }

    function store(string memory _data) public {
        require(msg.sender == owner, "Only owner can store data");
        data = _data;
    }

    function retrieve() public view returns (string memory) {
        return data;
    }
}
`);

  const [typescriptCode, setTypescriptCode] = useState(`import { ethers } from "ethers";

// A hypothetical script to interact with the contract.
const contractAddress = "YOUR_CONTRACT_ADDRESS";
`);

  // --- API Call Handler ---
  const handleRunCompile = async () => {
    setIsCompiling(true);
    setIsConsoleExpanded(true); // Automatically open the console
    setConsoleOutput('Sending code to compiler...');

    try {
      const response = await fetch('http://localhost:3000/compilesmartcontract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: solidityCode,
          fileName: 'StorageRegistry', // You can make this dynamic if needed
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConsoleOutput(`✅ Compilation Successful!\n\n${result.output}`);
      } else {
        setConsoleOutput(`❌ Compilation Failed!\n\n${result.error}`);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setConsoleOutput(`❌ Network Error: Could not connect to the compiler service.\n\n${error.message}`);
    } finally {
      setIsCompiling(false);
    }
  };


  const renderActiveTemplate = () => {
    switch (activeTemplate) {
      case 'smart-contract':
        return (
          <SmartContract
            solidityCode={solidityCode}
            onSolidityChange={setSolidityCode}
            typescriptCode={typescriptCode}
            onTypeScriptChange={setTypescriptCode}
          />
        );
      // ... cases for other templates
      default:
        return <div>Select a template</div>;
    }
  };

  return (
    <div className="bg-[#000000] p-4 rounded-lg border border-gray-800 h-full flex flex-col">
      <Header onRunClick={handleRunCompile} isCompiling={isCompiling} />
      <div className="pt-6 flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow relative">
          <div className="absolute inset-0">
             {renderActiveTemplate()}
          </div>
        </div>
      </div>
      <OutputConsole
        isExpanded={isConsoleExpanded}
        onToggle={() => setIsConsoleExpanded(!isConsoleExpanded)}
        content={consoleOutput}
        isLoading={isCompiling}
      />
    </div>
  );
};

export default Playground;