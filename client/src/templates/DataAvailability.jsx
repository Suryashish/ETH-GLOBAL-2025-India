import { useState } from "react";
import CodeEditor from "../components/CodeEditor";

// src/templates/DataAvailability.jsx
const Placeholder = ({ title }) => {
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

  return(<div className="flex h-full">
      <CodeEditor
        title="script.ts"
        language="typescript"
        code={typescriptCode}
      />
    </div>
  );
};
const DataAvailability = () => <Placeholder title="Data Availability" />;
export default DataAvailability;