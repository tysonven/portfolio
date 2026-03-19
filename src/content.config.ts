import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    status: z.string(),
    featured: z.boolean().optional(),
    stack: z.array(z.string()),
    live_url: z.string().nullable().optional(),
    sop_url: z.string().nullable().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { 'case-studies': caseStudies };
