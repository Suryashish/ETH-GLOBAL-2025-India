import Editor from '@monaco-editor/react';
import { setupSolidity } from './monaco-solidity/setup';

const CodeEditor = ({ code, language, title }) => {
  const handleEditorWillMount = (monaco) => {
    // Only run the custom Solidity setup if the language is 'solidity'
    if (language === 'solidity') {
      setupSolidity(monaco);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg flex-1 flex flex-col overflow-hidden">
      <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700 flex-shrink-0">
        &gt; {title}
      </div>
      <div className="flex-1">
        
        <Editor
          beforeMount={handleEditorWillMount}
          language={language}
          // Use our custom theme for Solidity, and the default for others
          theme={language === 'solidity' ? 'solidity-theme' : 'vs-dark'}
          value={code}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;