import { useState } from 'react';
import Playground from './components/Playground';
import Sidebar from './components/Sidebar';

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState('smart-contract');

  return (
    <div className="flex h-screen bg-black text-gray-300">
      <Sidebar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
      />
      <main className="flex-1 p-6 flex flex-col">
        <Playground activeTemplate={activeTemplate} />
      </main>
    </div>
  );
}