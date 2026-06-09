import { getAllToolSlugs, getTool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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

  return {
    title: tool.title,
    description: tool.metaDescription,
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      type: 'website',
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  return <ToolPageClient tool={tool} />;
}
