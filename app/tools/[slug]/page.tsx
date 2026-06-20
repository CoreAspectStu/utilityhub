import { getAllToolSlugs, getTool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { toolUrl } from '@/lib/site';
import { toolStructuredData } from '@/lib/structured-data';
import ToolPageClient from './ToolPageClient';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return { title: 'Tool Not Found' };

  const url = toolUrl(tool.slug);

  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url,
      type: 'website',
      siteName: 'UtilityHub',
    },
    twitter: {
      card: 'summary',
      title: tool.title,
      description: tool.metaDescription,
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  return (
    <>
      {/* Schema.org WebApplication structured data for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData(tool)) }}
      />
      <ToolPageClient tool={tool} />
    </>
  );
}
