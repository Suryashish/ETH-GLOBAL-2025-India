import Editor from '@monaco-editor/react';
import { setupSolidity } from './monaco-solidity/setup';

const CodeEditor = ({ code, language, title, onChange }) => {
  const handleEditorWillMount = (monaco) => {
    if (language === 'solidity') {
      setupSolidity(monaco);
    }
  };

  const handleEditorChange = (value) => {
    // If an onChange function is provided, call it with the new value.
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg flex-1 flex flex-col overflow-hidden">
      <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700 flex-shrink-0">
        &gt; {title}
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme={language === 'solidity' ? 'solidity-theme' : 'vs-dark'}
          value={code}
          beforeMount={handleEditorWillMount}
          onChange={handleEditorChange}
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