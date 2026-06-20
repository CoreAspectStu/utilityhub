import type { Tool } from '@/lib/tools';
import { siteConfig, toolUrl } from '@/lib/site';

/**
 * Schema.org JSON-LD generators.
 * Structured data is what unlocks rich results (rich snippets) in Google search —
 * the single highest-leverage SEO asset for a utility/tool site.
 */

const TOOL_KEYWORDS: Record<string, string[]> = {
  'word-counter': ['word counter', 'character counter', 'word count', 'reading time', 'keyword density'],
  'percentage-calculator': ['percentage calculator', 'percent change', 'percentage of', 'percent increase'],
  'text-case-converter': ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake_case'],
  'json-formatter': ['json formatter', 'json validator', 'json minifier', 'json beautifier', 'json tree'],
  'color-picker': ['color picker', 'hex to rgb', 'rgb to hsl', 'color palette generator', 'hex color'],
};

const TOOL_OPERATION_TYPE: Record<string, string> = {
  'word-counter': 'http://schema.org/CalculateAction',
  'percentage-calculator': 'http://schema.org/CalculateAction',
  'text-case-converter': 'http://schema.org/TransformAction',
  'json-formatter': 'http://schema.org/TransformAction',
  'color-picker': 'http://schema.org/FindAction',
};

/** WebApplication schema for a single tool page. */
export function toolStructuredData(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: toolUrl(tool.slug),
    description: tool.metaDescription,
    applicationCategory: mapCategory(tool.category),
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    isAccessibleForFree: true,
    featureList: tool.description,
    keywords: (TOOL_KEYWORDS[tool.slug] || []).join(', '),
    potentialAction: {
      '@type': TOOL_OPERATION_TYPE[tool.slug] || 'http://schema.org/Action',
      target: toolUrl(tool.slug),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

/** WebSite + ItemList schema for the home page. */
export function homeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/** ItemList enumerating all tools — helps Google understand the site's catalog. */
export function toolsListStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UtilityHub Tools',
    numberOfItems: 5,
    itemListElement: [
      { slug: 'word-counter', position: 1 },
      { slug: 'percentage-calculator', position: 2 },
      { slug: 'text-case-converter', position: 3 },
      { slug: 'json-formatter', position: 4 },
      { slug: 'color-picker', position: 5 },
    ].map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      url: toolUrl(item.slug),
    })),
  };
}

function mapCategory(category: string): string {
  const map: Record<string, string> = {
    Text: 'TextProcessor',
    Math: 'Calculator',
    Developer: 'DeveloperApplication',
    Design: 'DesignApplication',
  };
  return map[category] || 'UtilitiesApplication';
}
