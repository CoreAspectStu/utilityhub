'use client';

import { useState, useCallback } from 'react';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
  topKeywords: { word: string; count: number; density: string }[];
}

function analyzeText(text: string): TextStats {
  if (!text.trim()) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0 sec',
      speakingTime: '0 sec',
      topKeywords: [],
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;

  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  const readingMinutes = wordCount / 225;
  const readingTime =
    readingMinutes < 1
      ? `${Math.ceil(readingMinutes * 60)} sec`
      : `${Math.ceil(readingMinutes)} min`;

  const speakingMinutes = wordCount / 150;
  const speakingTime =
    speakingMinutes < 1
      ? `${Math.ceil(speakingMinutes * 60)} sec`
      : `${Math.ceil(speakingMinutes)} min`;

  // Keyword density
  const wordFreq: Record<string, number> = {};
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'it', 'as', 'be', 'was', 'are', 'been',
    'has', 'had', 'have', 'will', 'would', 'could', 'should', 'may', 'might',
    'shall', 'can', 'do', 'does', 'did', 'not', 'no', 'nor', 'so', 'if',
    'that', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they',
    'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our',
  ]);

  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 1 && !stopWords.has(clean)) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / wordCount) * 100).toFixed(1) + '%',
    }));

  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime,
    speakingTime,
    topKeywords,
  };
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const stats = analyzeText(text);

  return (
    <div className="space-y-6">
      {/* Ad slot */}
      <div className="lg:hidden">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-3 text-center text-gray-500 text-xs">
          Advertisement
        </div>
      </div>

      {/* Text Input */}
      <div>
        <label htmlFor="word-counter-input" className="block text-sm font-medium text-gray-300 mb-2">
          Enter or paste your text:
        </label>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-48 bg-gray-800 border border-gray-600 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: stats.words, icon: '📊' },
          { label: 'Characters', value: stats.characters, icon: '🔤' },
          { label: 'Chars (no spaces)', value: stats.charactersNoSpaces, icon: '🔡' },
          { label: 'Sentences', value: stats.sentences, icon: '📄' },
          { label: 'Paragraphs', value: stats.paragraphs, icon: '📑' },
          { label: 'Reading Time', value: stats.readingTime, icon: '⏱️' },
          { label: 'Speaking Time', value: stats.speakingTime, icon: '🎙️' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center"
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Keyword Density */}
      {stats.topKeywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Top Keywords
          </h3>
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-400 font-medium">Keyword</th>
                  <th className="text-right p-3 text-gray-400 font-medium">Count</th>
                  <th className="text-right p-3 text-gray-400 font-medium">Density</th>
                </tr>
              </thead>
              <tbody>
                {stats.topKeywords.map((kw) => (
                  <tr key={kw.word} className="border-b border-gray-700/50">
                    <td className="p-3 text-gray-200">{kw.word}</td>
                    <td className="p-3 text-right text-gray-200">{kw.count}</td>
                    <td className="p-3 text-right text-blue-400">{kw.density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
