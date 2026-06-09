export interface Tool {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  title: string;
  metaDescription: string;
  category: string;
}

export const tools: Tool[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter & Analyzer',
    description:
      'Count words, characters, sentences, paragraphs, and estimate reading time. Analyze keyword density and get detailed text statistics in real-time.',
    shortDescription: 'Real-time word count, reading time & keyword density',
    icon: '📝',
    title: 'Word Counter & Analyzer — Free Online Text Statistics Tool',
    metaDescription:
      'Free online word counter tool. Count words, characters, sentences, paragraphs, reading time, and analyze keyword density in real-time.',
    category: 'Text',
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description:
      'Calculate percentages easily with 3 modes: find X% of Y, find what percent X is of Y, and calculate percentage change between two numbers.',
    shortDescription: '3 modes: X% of Y, what % is X of Y, % change',
    icon: '🔢',
    title: 'Percentage Calculator — Free Online % Calculator Tool',
    metaDescription:
      'Free percentage calculator with 3 modes. Calculate X% of Y, find what percent X is of Y, and percentage change between numbers.',
    category: 'Math',
  },
  {
    slug: 'text-case-converter',
    name: 'Text Case Converter',
    description:
      'Convert text between different cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case. One-click transformations.',
    shortDescription: 'Convert text to UPPERCASE, camelCase, snake_case & more',
    icon: '🔤',
    title: 'Text Case Converter — Free Online Case Changer Tool',
    metaDescription:
      'Free online text case converter. Transform text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case instantly.',
    category: 'Text',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description:
      'Format, validate, and minify JSON data. View formatted output as a collapsible tree. Spot errors instantly with syntax highlighting.',
    shortDescription: 'Format, validate & minify JSON with tree view',
    icon: '{}',
    title: 'JSON Formatter & Validator — Free Online JSON Tool',
    metaDescription:
      'Free online JSON formatter, validator, and minifier. Beautify JSON with collapsible tree view. Validate and minify JSON data instantly.',
    category: 'Developer',
  },
  {
    slug: 'color-picker',
    name: 'Color Picker',
    description:
      'Pick colors using HEX input, RGB sliders, and HSL values. Preview colors and generate complementary palettes with 5 harmonious colors.',
    shortDescription: 'HEX/RGB/HSL picker with palette generator',
    icon: '🎨',
    title: 'Color Picker — Free Online HEX RGB HSL Color Tool',
    metaDescription:
      'Free online color picker tool. Convert between HEX, RGB, and HSL. Generate complementary color palettes with 5 harmonious colors.',
    category: 'Design',
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}
