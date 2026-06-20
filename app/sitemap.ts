import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { absoluteUrl } from '@/lib/site';

/**
 * Generates /sitemap.xml at build time.
 * Home page + every tool page, with priority/lastmod tuned for a utility site
 * where tool pages are the primary landing pages (higher priority than home).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(`tools/${tool.slug}/`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: absoluteUrl(),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...toolRoutes,
  ];
}
