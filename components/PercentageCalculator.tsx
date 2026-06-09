'use client';

import { useState } from 'react';

type Mode = 'percentOf' | 'whatPercent' | 'percentChange';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('percentOf');
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);

    if (isNaN(a) || isNaN(b)) {
      setResult('Please enter valid numbers.');
      return;
    }

    switch (mode) {
      case 'percentOf':
        setResult(`${a}% of ${b} = ${(a / 100) * b}`);
        break;
      case 'whatPercent':
        if (b === 0) {
          setResult('Cannot divide by zero.');
          return;
        }
        setResult(`${a} is ${((a / b) * 100).toFixed(2)}% of ${b}`);
        break;
      case 'percentChange':
        if (b === 0) {
          setResult('Cannot calculate change from zero.');
          return;
        }
        const change = (((a - b) / b) * 100).toFixed(2);
        const direction = parseFloat(change) >= 0 ? 'increase' : 'decrease';
        setResult(`${change}% ${direction} (from ${b} to ${a})`);
        break;
    }
  }

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        {([
          { key: 'percentOf', label: 'X% of Y' },
          { key: 'whatPercent', label: 'X is what % of Y' },
          { key: 'percentChange', label: '% Change' },
        ] as { key: Mode; label: string }[]).map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key);
              setResult(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pct-value-a" className="block text-sm font-medium text-gray-300 mb-2">
              {mode === 'percentOf' ? 'Percentage (%)' : mode === 'whatPercent' ? 'Value (X)' : 'New Value'}
            </label>
            <input
              id="pct-value-a"
              type="number"
              value={valueA}
              onChange={(e) => setValueA(e.target.value)}
              placeholder={mode === 'percentOf' ? 'e.g. 25' : 'e.g. 50'}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="pct-value-b" className="block text-sm font-medium text-gray-300 mb-2">
              {mode === 'percentOf' ? 'Of Value (Y)' : mode === 'whatPercent' ? 'Total (Y)' : 'Original Value'}
            </label>
            <input
              id="pct-value-b"
              type="number"
              value={valueB}
              onChange={(e) => setValueB(e.target.value)}
              placeholder={mode === 'percentOf' ? 'e.g. 200' : 'e.g. 200'}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-4 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Calculate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-gray-800 border border-blue-500/30 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-1">Result</div>
          <div className="text-2xl font-bold text-white">{result}</div>
        </div>
      )}

      {/* Quick reference */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Common Percentages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: '10%', value: '0.1' },
            { label: '25%', value: '0.25' },
            { label: '50%', value: '0.5' },
            { label: '75%', value: '0.75' },
          ].map((p) => (
            <div key={p.label} className="text-center p-2 bg-gray-900 rounded-lg">
              <div className="text-white font-bold">{p.label}</div>
              <div className="text-gray-400 text-sm">= {p.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad slot */}
      <div className="lg:hidden">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-3 text-center text-gray-500 text-xs">
          Advertisement
        </div>
      </div>
    </div>
  );
}
