import CodeEditor from "../components/CodeEditor";

const DataAvailability = ({ typescriptCode, onTypeScriptChange }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <CodeEditor
        title="script.ts"
        language="typescript"
        code={typescriptCode}
        onChange={onTypeScriptChange}
      />
    </div>
  );
};

export default DataAvailability;
