'use client';

import { useState } from 'react';

interface TreeNodeProps {
  keyName: string;
  value: unknown;
  depth: number;
}

function TreeNode({ keyName, value, depth }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (value === null) {
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <span className="text-purple-400">{keyName}</span>
        <span className="text-gray-500">: </span>
        <span className="text-orange-400">null</span>
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <span className="text-purple-400">{keyName}</span>
        <span className="text-gray-500">: </span>
        <span className="text-yellow-400">{value.toString()}</span>
      </div>
    );
  }

  if (typeof value === 'number') {
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <span className="text-purple-400">{keyName}</span>
        <span className="text-gray-500">: </span>
        <span className="text-blue-400">{value}</span>
      </div>
    );
  }

  if (typeof value === 'string') {
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <span className="text-purple-400">{keyName}</span>
        <span className="text-gray-500">: </span>
        <span className="text-green-400">&quot;{value}&quot;</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-300 hover:text-white text-sm"
        >
          {expanded ? '▼' : '▶'} {keyName}{' '}
          <span className="text-gray-500">[{value.length}]</span>
        </button>
        {expanded &&
          value.map((item, idx) => (
            <TreeNode
              key={idx}
              keyName={`[${idx}]`}
              value={item}
              depth={depth + 1}
            />
          ))}
      </div>
    );
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div style={{ paddingLeft: depth * 20 }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-300 hover:text-white text-sm"
        >
          {expanded ? '▼' : '▶'} {keyName}{' '}
          <span className="text-gray-500">{'{}'}</span>
        </button>
        {expanded &&
          entries.map(([k, v]) => (
            <TreeNode key={k} keyName={k} value={v} depth={depth + 1} />
          ))}
      </div>
    );
  }

  return null;
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [parsedJson, setParsedJson] = useState<unknown>(null);
  const [showTree, setShowTree] = useState(false);

  function formatJson() {
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
      setParsedJson(null);
    }
  }

  function minifyJson() {
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
      setParsedJson(null);
    }
  }

  function validateJson() {
    try {
      JSON.parse(input);
      setError('');
      setOutput('✅ Valid JSON');
    } catch (e) {
      setError('❌ ' + (e as Error).message);
      setOutput('');
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  function loadSample() {
    const sample = {
      name: 'UtilityHub',
      version: '1.0.0',
      tools: ['word-counter', 'json-formatter', 'color-picker'],
      settings: {
        theme: 'dark',
        language: 'en',
        features: { ads: true, analytics: false },
      },
    };
    setInput(JSON.stringify(sample, null, 2));
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="json-input" className="text-sm font-medium text-gray-300">
            JSON Input:
          </label>
          <button
            onClick={loadSample}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Load Sample
          </button>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON here, e.g. {"key": "value"}'
          className="w-full h-48 bg-gray-800 border border-gray-600 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y font-mono text-sm"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors"
        >
          Format
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm transition-colors"
        >
          Minify
        </button>
        <button
          onClick={validateJson}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm transition-colors"
        >
          Validate
        </button>
        {parsedJson !== null && (
          <button
            onClick={() => setShowTree(!showTree)}
            className={`px-4 py-2 font-medium rounded-lg text-sm transition-colors ${
              showTree
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {showTree ? 'Hide Tree' : 'Show Tree'}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Tree view */}
      {showTree && parsedJson !== null && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-96 overflow-auto">
          <div className="text-sm font-mono">
            <TreeNode keyName="root" value={parsedJson} depth={0} />
          </div>
        </div>
      )}

      {/* Output */}
      {output && !showTree && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Output:</label>
            <button
              onClick={copyOutput}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              📋 Copy
            </button>
          </div>
          <pre className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-green-400 overflow-auto max-h-96 text-sm font-mono">
            {output}
          </pre>
        </div>
      )}

      {/* Ad slot */}
      <div className="lg:hidden">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-3 text-center text-gray-500 text-xs">
          Advertisement
        </div>
      </div>
    </div>
  );
}
