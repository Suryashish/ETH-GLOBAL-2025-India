export const setupSolidity = (monaco) => {
  const keywords = [
    "address",
    "anonymous",
    "as",
    "assembly",
    "bool",
    "break",
    "bytes",
    "bytes1",
    "bytes2",
    "bytes32",
    "calldata",
    "case",
    "catch",
    "constant",
    "constructor",
    "continue",
    "contract",
    "default",
    "delete",
    "do",
    "else",
    "emit",
    "enum",
    "error",
    "event",
    "external",
    "fallback",
    "false",
    "for",
    "function",
    "if",
    "immutable",
    "import",
    "indexed",
    "interface",
    "internal",
    "is",
    "library",
    "mapping",
    "memory",
    "modifier",
    "new",
    "override",
    "payable",
    "pragma",
    "private",
    "public",
    "pure",
    "receive",
    "require",
    "return",
    "returns",
    "revert",
    "selfdestruct",
    "storage",
    "string",
    "struct",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "type",
    "uint",
    "uint8",
    "uint256",
    "using",
    "view",
    "virtual",
    "while",
  ];

  const globals = [
    "block",
    "blockhash",
    "gasleft",
    "msg",
    "now",
    "tx",
    "abi",
    "assert",
    "keccak256",
    "sha256",
    "ripemd160",
  ];

  const typeKeywords = [
    "uint",
    "uint8",
    "uint256",
    "int",
    "int8",
    "int256",
    "bytes",
    "bytes1",
    "bytes32",
    "string",
    "bool",
    "address",
    "mapping",
    "struct",
  ];

  // --- 1. Theme ---
  monaco.editor.defineTheme("solidity-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "C586C0" },
      { token: "number", foreground: "B5CEA8" },
      { token: "string", foreground: "CE9178" },
      { token: "type", foreground: "4EC9B0" },
      { token: "global", foreground: "9CDCFE" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
    },
  });

  // --- 2. Register Solidity Language ---
  monaco.languages.register({ id: "solidity" });

  // --- 3. Tokenizer (corrected logic) ---
  monaco.languages.setMonarchTokensProvider("solidity", {
    keywords,
    globals,
    typeKeywords,
    operators: [
      "=",
      ">",
      "<",
      "!",
      "~",
      "?",
      ":",
      "==",
      "<=",
      ">=",
      "!=",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "^",
      "%",
      "<<",
      ">>",
      "=>",
    ],

    tokenizer: {
      root: [
        // identifiers and keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@globals": "global",
              "@default": "identifier",
            },
          },
        ],

        // strings & numbers
        [/".*?"/, "string"],
        [/\d+/, "number"],

        // brackets
        [/[{}()\[\]]/, "@brackets"],

        // operators (✅ fixed)
        [
          /[=><!~?:&|+\-*\/^%]+/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],

        // comments
        [/\/\/.*/, "comment"],
        [/\/\*[\s\S]*?\*\//, "comment"],
      ],
    },
  });

  // --- 4. Autocomplete ---
  monaco.languages.registerCompletionItemProvider("solidity", {
    provideCompletionItems: () => {
      const suggestions = [
        ...keywords.map((k) => ({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
        })),
        ...globals.map((g) => ({
          label: g,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: g,
        })),
        {
          label: "contract",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "contract ${1:MyContract} {\n\t\n}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a new smart contract.",
        },
        {
          label: "function",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "function ${1:myFunction}(${2}) ${3:public} {\n\t${4}\n}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a new function.",
        },
      ];
      return { suggestions };
    },
  });
};
