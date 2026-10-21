/**
 * Validasi konten tanpa menjalankan Astro:
 * - frontmatter lengkap (judul, modul, menit, sumber, kuis valid)
 * - id file ada di kurikulum
 * - studi kasus memakai 8 section dengan urutan wajib
 * - pelajaran punya bagian "Ringkasan" dan "Pertanyaan interviewer"
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import { validateQuiz } from '../lib/quiz';
import { plannedOrder } from '../data/curriculum';

const ROOT = join(process.cwd(), 'src/content/lessons');

export const CASE_SECTIONS = [
  'Requirements',
  'Estimasi kapasitas',
  'API design',
  'Skema data',
  'High-level design',
  'Detailed design',
  'Evaluasi terhadap non-functional requirements',
  'Pertanyaan lanjutan interviewer',
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(f) ? [p] : [];
  });
}

function h2s(body: string): string[] {
  return body
    .split('\n')
    .filter((l) => /^## /.test(l))
    .map((l) =>
      l
        .replace(/^## /, '')
        .replace(/^\d+\.\s*/, '')
        .trim(),
    );
}

/** Pola Mermaid yang pasti gagal parse di browser (ditemukan saat /ui-check). */
function mermaidLint(body: string): string[] {
  const errors: string[] = [];
  for (const m of body.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
    const block = m[1];
    const isSeq = block.trimStart().startsWith('sequenceDiagram');
    block.split('\n').forEach((ln) => {
      if (isSeq) {
        if (/:\s[^\n]*;/.test(ln)) errors.push(`titik koma di pesan sequence diagram: ${ln.trim()}`);
      } else {
        if (/\w\[(?![(["])[^\]"]*\([^\]"]*\]/.test(ln))
          errors.push(`label dengan kurung tanpa kutip: ${ln.trim()}`);
        if (/\w\{(?!["{])[^}"]*\([^}"]*\}/.test(ln))
          errors.push(`label { } dengan kurung tanpa kutip: ${ln.trim()}`);
        if (/\w\[\[(?!")[^\]]*\([^\]]*\]\]/.test(ln))
          errors.push(`label [[ ]] dengan kurung tanpa kutip: ${ln.trim()}`);
        if (/\w\[(?![(["])[^\]"]*"[^\]]*\]/.test(ln))
          errors.push(`kutip ganda di dalam label tanpa kutip pembuka: ${ln.trim()}`);
      }
    });
  }
  return errors;
}

const files = walk(ROOT);
const planned = new Set(plannedOrder());

describe('konten pelajaran', () => {
  it('ada minimal satu pelajaran', () => expect(files.length).toBeGreaterThan(0));

  for (const file of files) {
    const id = relative(ROOT, file).replace(/\.mdx?$/, '');
    const { data, content } = matter(readFileSync(file, 'utf8'));

    describe(id, () => {
      it('ada di kurikulum', () => expect(planned.has(id)).toBe(true));
      it('modul cocok dengan folder', () => expect(data.module).toBe(id.split('/')[0]));
      it('frontmatter wajib', () => {
        expect(typeof data.title).toBe('string');
        expect(data.minutes).toBeGreaterThan(0);
        expect(Array.isArray(data.sources) && data.sources.length > 0).toBe(true);
        for (const s of data.sources) expect(s.url).toMatch(/^https?:\/\//);
      });
      it('kuis valid (3-5 soal, tepat satu benar, semua ada penjelasan)', () => {
        const quiz = data.quiz ?? [];
        expect(quiz.length).toBeGreaterThanOrEqual(3);
        expect(quiz.length).toBeLessThanOrEqual(5);
        expect(validateQuiz(quiz)).toEqual([]);
      });
      it('struktur body sesuai tipe', () => {
        const heads = h2s(content);
        if (data.type === 'case') {
          const idx = CASE_SECTIONS.map((s) => heads.findIndex((h) => h.startsWith(s)));
          expect(
            idx.every((i) => i >= 0),
            `section hilang: ${CASE_SECTIONS.filter((_, i) => idx[i] < 0).join(', ')}`,
          ).toBe(true);
          expect([...idx].sort((a, b) => a - b)).toEqual(idx);
        } else {
          expect(heads.some((h) => /Tujuan belajar/i.test(h))).toBe(true);
          expect(heads.some((h) => /interviewer/i.test(h))).toBe(true);
          expect(heads.some((h) => /Ringkasan/i.test(h))).toBe(true);
        }
        expect(content.includes('```mermaid')).toBe(true);
        expect(mermaidLint(content)).toEqual([]);
      });
      it('tidak merujuk sumber berbayar', () => {
        expect(content).not.toMatch(/educative\.io/i);
        for (const s of data.sources) expect(s.url).not.toMatch(/educative\.io/i);
      });
    });
  }
});
