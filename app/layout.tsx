import type { Metadata } from 'next';
import './globals.css';
import { getAllToolSlugs, getTool } from '@/lib/tools';

export const metadata: Metadata = {
  title: {
    default: 'UtilityHub — Free Online Tools',
    template: '%s | UtilityHub',
  },
  description:
    'Free online utility tools: word counter, percentage calculator, text case converter, JSON formatter, and color picker. Fast, free, no sign-up required.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <a href="/" className="flex items-center gap-2 text-xl font-bold text-white no-underline">
                <span className="text-2xl">⚡</span>
                <span>UtilityHub</span>
              </a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/tools/word-counter/" className="text-gray-300 hover:text-white no-underline">
                  Word Counter
                </a>
                <a href="/tools/percentage-calculator/" className="text-gray-300 hover:text-white no-underline">
                  Percentage Calc
                </a>
                <a href="/tools/text-case-converter/" className="text-gray-300 hover:text-white no-underline">
                  Case Converter
                </a>
                <a href="/tools/json-formatter/" className="text-gray-300 hover:text-white no-underline">
                  JSON Formatter
                </a>
                <a href="/tools/color-picker/" className="text-gray-300 hover:text-white no-underline">
                  Color Picker
                </a>
              </div>
              {/* Mobile menu button */}
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} UtilityHub. Free online tools.
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <a href="/" className="hover:text-white no-underline">Home</a>
                <span>•</span>
                <a href="#tools" className="hover:text-white no-underline">All Tools</a>
              </div>
            </div>
          </div>
        </footer>

        {/* AdSense placeholder */}
        <div className="hidden" data-ad-slot="ADSENSE_SLOT_ID" />
      </body>
    </html>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="text-gray-300 hover:text-white cursor-pointer list-none p-2">
          ☰
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="py-2">
            {[
              { href: '/tools/word-counter/', label: '📝 Word Counter' },
              { href: '/tools/percentage-calculator/', label: '🔢 Percentage Calc' },
              { href: '/tools/text-case-converter/', label: '🔤 Case Converter' },
              { href: '/tools/json-formatter/', label: '{} JSON Formatter' },
              { href: '/tools/color-picker/', label: '🎨 Color Picker' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
