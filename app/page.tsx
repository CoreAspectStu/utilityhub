import { tools } from '@/lib/tools';
import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site';
import { homeStructuredData, toolsListStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'UtilityHub — Free Online Utility Tools',
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl(),
  },
  openGraph: {
    title: 'UtilityHub — Free Online Utility Tools',
    description: siteConfig.description,
    url: absoluteUrl(),
    type: 'website',
    siteName: 'UtilityHub',
  },
  twitter: {
    card: 'summary',
    title: 'UtilityHub — Free Online Utility Tools',
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Schema.org structured data for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsListStructuredData()) }}
      />

      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          ⚡ UtilityHub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Free online tools that work instantly in your browser. No sign-up, no
          tracking, no nonsense.
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span>✓ Free forever</span>
          <span>✓ No sign-up</span>
          <span>✓ Works offline</span>
          <span>✓ Privacy-first</span>
        </div>
      </section>

      {/* Mobile AdSense slot */}
      <div className="md:hidden my-6">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-4 text-center text-gray-500 text-sm">
          Advertisement
        </div>
      </div>

      {/* Tools Grid */}
      <section id="tools">
        <h2 className="text-2xl font-bold text-white mb-8">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="group block bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:bg-gray-750 transition-all duration-200 no-underline"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {tool.shortDescription}
              </p>
              <span className="text-xs text-blue-400 font-medium">
                Use Tool →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Desktop sidebar ad slot */}
      <div className="hidden md:block my-8">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-4 text-center text-gray-500 text-sm">
          Advertisement
        </div>
      </div>

      {/* About section */}
      <section className="mt-16 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">About UtilityHub</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400">
            UtilityHub provides free, fast, and privacy-friendly online tools
            that run entirely in your browser. Whether you need to count words,
            calculate percentages, convert text cases, format JSON, or pick the
            perfect color — we&apos;ve got you covered.
          </p>
        </div>
      </section>
    </div>
  );
}
