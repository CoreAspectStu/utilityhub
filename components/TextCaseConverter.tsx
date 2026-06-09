'use client';

import { useState } from 'react';

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

function toSentenceCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

function toSnakeCase(str: string): string {
  return str
    .replace(/\s+/g, '_')
    .replace(/([A-Z])/g, '_$1')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

function toKebabCase(str: string): string {
  return str
    .replace(/\s+/g, '-')
    .replace(/([A-Z])/g, '-$1')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

const conversions = [
  { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
  { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
  { label: 'Title Case', fn: toTitleCase },
  { label: 'Sentence case', fn: toSentenceCase },
  { label: 'camelCase', fn: toCamelCase },
  { label: 'snake_case', fn: toSnakeCase },
  { label: 'kebab-case', fn: toKebabCase },
];

export default function TextCaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeConversion, setActiveConversion] = useState('');

  function convert(fn: (s: string) => string, label: string) {
    setOutput(fn(input));
    setActiveConversion(label);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label htmlFor="case-input" className="block text-sm font-medium text-gray-300 mb-2">
          Enter or paste your text:
        </label>
        <textarea
          id="case-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to convert..."
          className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />
      </div>

      {/* Conversion buttons */}
      <div className="flex flex-wrap gap-2">
        {conversions.map((conv) => (
          <button
            key={conv.label}
            onClick={() => convert(conv.fn, conv.label)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeConversion === conv.label
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
            }`}
          >
            {conv.label}
          </button>
        ))}
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Result ({activeConversion})
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              📋 Copy
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 text-green-400 resize-y"
          />
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
