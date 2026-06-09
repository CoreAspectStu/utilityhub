'use client';

import { Tool } from '@/lib/tools';
import dynamic from 'next/dynamic';

const toolComponents: Record<string, React.ComponentType> = {
  'word-counter': dynamic(() => import('@/components/WordCounter')),
  'percentage-calculator': dynamic(() => import('@/components/PercentageCalculator')),
  'text-case-converter': dynamic(() => import('@/components/TextCaseConverter')),
  'json-formatter': dynamic(() => import('@/components/JsonFormatter')),
  'color-picker': dynamic(() => import('@/components/ColorPicker')),
};

interface ToolPageClientProps {
  tool: Tool;
}

export default function ToolPageClient({ tool }: ToolPageClientProps) {
  const ToolComponent = toolComponents[tool.slug];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main content */}
      <div className="lg:col-span-3">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-gray-300 no-underline">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Tools</span>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {tool.icon} {tool.name}
          </h1>
          <p className="text-gray-400">{tool.description}</p>
        </div>

        {/* Tool component */}
        {ToolComponent ? <ToolComponent /> : <p>Tool not found.</p>}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-20 space-y-6">
          {/* Ad slot */}
          <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-4 text-center text-gray-500 text-sm h-64 flex items-center justify-center">
            Advertisement
          </div>

          {/* Quick links */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-3">
              Other Tools
            </h3>
            <div className="space-y-2">
              {[
                { href: '/tools/word-counter/', label: '📝 Word Counter', slug: 'word-counter' },
                { href: '/tools/percentage-calculator/', label: '🔢 Percentage Calc', slug: 'percentage-calculator' },
                { href: '/tools/text-case-converter/', label: '🔤 Case Converter', slug: 'text-case-converter' },
                { href: '/tools/json-formatter/', label: '{} JSON Formatter', slug: 'json-formatter' },
                { href: '/tools/color-picker/', label: '🎨 Color Picker', slug: 'color-picker' },
              ]
                .filter((t) => t.slug !== tool.slug)
                .map((t) => (
                  <a
                    key={t.slug}
                    href={t.href}
                    className="block text-sm text-gray-400 hover:text-white no-underline"
                  >
                    {t.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
