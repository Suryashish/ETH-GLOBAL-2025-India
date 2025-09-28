import { useState } from 'react';
import Header from './Header';
import OutputConsole from './OutputConsole';

// Import all template components
import SmartContract from '../templates/SmartContract';
import StorageExample from '../templates/StorageExample';
import DataAvailability from '../templates/DataAvailability';
import DataServing from '../templates/DataServing';

const Playground = ({ activeTemplate }) => {
  // State for the console
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // State for the code in the editors (specific to the SmartContract template)
  const [solidityCode, setSolidityCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
}
`);

  const [typescriptCode, setTypescriptCode] = useState(`import { ethers } from "ethers";

// A hypothetical script to interact with the contract.
const contractAddress = "YOUR_CONTRACT_ADDRESS";
`);

  // --- API Call Handler ---
  const handleRunCompile = async () => {
    // This function is specific to the SmartContract template,
    // so we can add a check if needed, though the button is universal.
    // if (activeTemplate !== 'smart-contract') {
    //     setConsoleOutput('This template does not support compilation.');
    //     setIsConsoleExpanded(true);
    //     return;
    // }

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

      // Handle cases where the response is not ok (e.g., 500 server error)
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

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


  const handleRunJsonRpc = async () => {
    // This function is specific to the SmartContract template,
    // so we can add a check if needed, though the button is universal.
    if (activeTemplate !== 'smart-contract') {
        try{
            const response = await fetch('http://localhost:3000/runJsCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: typescriptCode,
                    fileName: 'StorageRegistry', // You can make this dynamic if needed
                }),
            });

            // Handle cases where the response is not ok (e.g., 500 server error)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            if (result.success) {
                setConsoleOutput(`✅ Compilation Successful!\n\n${result.output}`);
            } else {
                setConsoleOutput(`❌ Compilation Failed!\n\n${result.error}`);
            }

        }
        catch (error) {
            console.error('API call failed:', error);
            setConsoleOutput(`❌ Network Error: Could not connect to the compiler service.\n\n${error.message}`);
        }
        return;
    }
  };

  // This function now renders the correct component for each active template
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
      case 'storage':
        return (<StorageExample 
                  typescriptCode={typescriptCode}
                  onTypeScriptChange={setTypescriptCode}
                />);
      
      case 'data-serving':
        return (<DataServing 
          typescriptCode={typescriptCode}
          onTypeScriptChange={setTypescriptCode}
        />);
      case 'da':
        return(
        <DataAvailability 
          typescriptCode={typescriptCode}
          onTypeScriptChange={setTypescriptCode}
        />
      );
      default:
        // A fallback for an unknown template
        return <div className="p-4 text-gray-500">Please select a template from the sidebar.</div>;
    }
  };

  return (
    <div className="bg-[#000000] p-4 rounded-lg border border-gray-800 h-full flex flex-col">
      <Header onRunClick={activeTemplate !== 'smart-contract' ? handleRunJsonRpc : handleRunCompile} isCompiling={isCompiling} />
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