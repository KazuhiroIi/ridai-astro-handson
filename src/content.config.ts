import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // 'src/content/blog'内のMarkdownファイルを読み込む
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),

  // Markdownのスキーマを定義
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    created: z.string(),
    updated: z.string().optional(),
  }),
});

export const collections = { blog };