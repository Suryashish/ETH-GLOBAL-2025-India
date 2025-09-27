import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';



const SmartContract = () => {

  const [solidityCode,setSolidityCode] = useState(`pragma solidity ^0.8.19;

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

const [typescriptCode,setTypescriptCode] = useState(`import { ethers } from "ethers";

// A hypothetical script to interact with the contract.
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  "function store(string memory _data) public",
  "function retrieve() public view returns (string memory)"
];

async function main() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const storageContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  const data = await storageContract.retrieve();
  console.log("Current data:", data);
}

main().catch(console.error);
`);
  return (
    // This is now a vertical layout, designed to fill the available space above the console.
    <div className="flex  gap-4 h-full">
      <CodeEditor
        title="solidity.0g"
        language="solidity"
        code={solidityCode}
        onChange={setSolidityCode}
      />
      {/* <CodeEditor
        title="script.ts"
        language="typescript"
        code={typescriptCode}
        onChange={setTypescriptCode}
      /> */}
    </div>
  );
};

export default SmartContract;