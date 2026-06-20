/**
 * Central site configuration — single source of truth for SEO-critical values.
 *
 * Set NEXT_PUBLIC_SITE_URL at build time to the canonical production domain,
 * e.g. `NEXT_PUBLIC_SITE_URL=https://utilityhub.example.com npm run build`.
 * Falls back to a localhost placeholder so local dev never breaks.
 */
export const siteConfig = {
  name: 'UtilityHub',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://utilityhub.app',
  description:
    'Free online utility tools: word counter, percentage calculator, text case converter, JSON formatter, and color picker. Fast, free, no sign-up required.',
  twitter: '@utilityhub',
  locale: 'en_US',
};

/** Absolute URL helper — keeps trailingSlash consistent with next.config.js. */
export function absoluteUrl(path = ''): string {
  const clean = path.replace(/^\//, '');
  return `${siteConfig.url}/${clean}`;
}

/** Tool detail URL (matches trailingSlash:true in next.config.js). */
export function toolUrl(slug: string): string {
  return `${siteConfig.url}/tools/${slug}/`;
}
