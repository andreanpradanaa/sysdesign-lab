import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { MODULE_IDS } from './data/curriculum';

/** Satu opsi jawaban kuis: teks, benar/salah, dan penjelasan kenapa. */
const quizOption = z.object({
  text: z.string(),
  correct: z.boolean().default(false),
  why: z.string(),
});

const quizQuestion = z.object({
  q: z.string(),
  options: z.array(quizOption).min(2).max(6),
});

const source = z.object({ title: z.string(), url: z.string().url() });

/**
 * Koleksi pelajaran: bagian-1 .. bagian-4. ID entri = "<bagian>/<slug>" (dari path file).
 * - type "lesson": modul konsep (format pelajaran).
 * - type "case": studi kasus (wajib 8 section berurutan, dicek oleh test).
 * - type "postmortem": pelajaran dari outage nyata.
 */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    module: z.enum(MODULE_IDS),
    order: z.number().int().nonnegative(),
    minutes: z.number().int().positive(),
    type: z.enum(['lesson', 'case', 'postmortem']).default('lesson'),
    /** Kesulitan dan tag pola, terutama untuk studi kasus (ditampilkan sebagai badge dan filter). */
    difficulty: z.enum(['mudah', 'sedang', 'sulit']).optional(),
    tags: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    sources: z.array(source).min(1),
    summary: z.string().optional(),
    quiz: z.array(quizQuestion).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Soal mock interview: dirujuk ke studi kasus terkait. */
const mocks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/mocks' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().nonnegative(),
    minutes: z.number().int().positive().default(45),
    relatedCase: z.string().optional(),
    difficulty: z.enum(['mudah', 'sedang', 'sulit']).default('sedang'),
    hints: z.array(z.string()).default([]),
  }),
});

export const collections = { lessons, mocks };
