import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site';

/**
 * Generates /robots.txt at build time.
 * Allows all crawlers, points them at the sitemap for efficient discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteUrl('sitemap.xml'),
    host: siteConfig.url,
  };
}
