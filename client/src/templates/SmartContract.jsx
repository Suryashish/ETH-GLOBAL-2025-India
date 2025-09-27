import CodeEditor from '../components/CodeEditor';

const SmartContract = ({
  solidityCode,
  onSolidityChange,
  typescriptCode,
  onTypeScriptChange,
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <CodeEditor
        title="solidity.0g"
        language="solidity"
        code={solidityCode}
        onChange={onSolidityChange}
      />
      {/* <CodeEditor
        title="script.ts"
        language="typescript"
        code={typescriptCode}
        onChange={onTypeScriptChange}
      /> */}
    </div>
  );
};

export default SmartContract;