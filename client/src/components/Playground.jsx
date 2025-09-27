import { useState } from 'react';
import Header from './Header';
import OutputConsole from './OutputConsole';
import SmartContract from '../templates/SmartContract';
import StorageExample from '../templates/StorageExample';
import DataAvailability from '../templates/DataAvailability';
import DataServing from '../templates/DataServing';

const Playground = ({ activeTemplate }) => {
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);

  const renderActiveTemplate = () => {
    switch (activeTemplate) {
      case 'smart-contract':
        return <SmartContract />;
      case 'storage':
        return <StorageExample />;
      case 'da':
        return <DataAvailability />;
      case 'data-serving':
        return <DataServing />;
      default:
        return <SmartContract />;
    }
  };

  return (
    <div className="bg-[#000000] p-4 rounded-lg border border-gray-800 h-full flex flex-col">
      <Header />
      <div className="pt-6 flex-grow flex flex-col overflow-hidden">
        {/* This container will hold the editors and take up the remaining space */}
        <div className="flex-grow relative">
          <div className="absolute inset-0">
             {renderActiveTemplate()}
          </div>
        </div>
      </div>
      {/* Console is positioned at the bottom */}
      <OutputConsole
        isExpanded={isConsoleExpanded}
        onToggle={() => setIsConsoleExpanded(!isConsoleExpanded)}
      />
    </div>
  );
};

export default Playground;