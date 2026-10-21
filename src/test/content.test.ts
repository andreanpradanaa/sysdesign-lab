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
import { validateQuiz, type QuizQuestion } from '../lib/quiz';
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

/** Pemeriksaan gaya bahasa (docs/features/gaya-bahasa.md). Hanya untuk file yang sudah ditulis ulang. */
export const STYLE_CHECKED = ['bagian-1/', 'bagian-2/', 'bagian-3/', 'bagian-4/'];
const MAX_SENTENCE_WORDS = 30;
const MAX_OPTION_WORDS = 20;
const MAX_QUESTION_WORDS = 30;
const MAX_PARENS_PER_100 = 1;

function proseLines(body: string): string[] {
  const noCode = body.replace(/```[\s\S]*?```/g, '');
  return noCode
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('|') && !l.startsWith('#') && !l.startsWith('<') && !/^!\[/.test(l))
    .map((l) => l.replace(/^(\d+\.|[-*])\s+/, '').replace(/[*_`]/g, ''));
}

function styleLint(body: string): string[] {
  const errors: string[] = [];
  const lines = proseLines(body);
  let words = 0;
  let parens = 0;
  for (const line of lines) {
    if (line.includes('→')) errors.push(`panah di prosa: ${line.slice(0, 80)}`);
    if (/;\s/.test(line)) errors.push(`titik koma di prosa: ${line.slice(0, 80)}`);
    parens += (line.match(/\(/g) ?? []).length;
    for (const sentence of line.split(/(?<=[.!?])\s+(?=[A-Z"“])/)) {
      const n = sentence.trim().split(/\s+/).filter(Boolean).length;
      words += n;
      if (n > MAX_SENTENCE_WORDS) errors.push(`kalimat ${n} kata: ${sentence.slice(0, 80)}`);
    }
  }
  if (words > 0 && (parens * 100) / words > MAX_PARENS_PER_100) {
    errors.push(`tanda kurung ${parens} per ${words} kata (batas ${MAX_PARENS_PER_100}/100)`);
  }
  return errors;
}

function quizStyleLint(quiz: QuizQuestion[]): string[] {
  const errors: string[] = [];
  quiz.forEach((q, i) => {
    const qn = q.q.split(/\s+/).length;
    if (qn > MAX_QUESTION_WORDS) errors.push(`soal #${i + 1} ${qn} kata`);
    q.options.forEach((o, j) => {
      const n = o.text.split(/\s+/).length;
      if (n > MAX_OPTION_WORDS)
        errors.push(`soal #${i + 1} opsi #${j + 1} ${n} kata: ${o.text.slice(0, 60)}`);
    });
  });
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
      if (STYLE_CHECKED.some((prefix) => id.startsWith(prefix))) {
        it('mengikuti pedoman gaya bahasa', () => {
          expect(styleLint(content)).toEqual([]);
          expect(quizStyleLint(data.quiz ?? [])).toEqual([]);
        });
      }
      it('tidak merujuk sumber berbayar', () => {
        expect(content).not.toMatch(/educative\.io/i);
        for (const s of data.sources) expect(s.url).not.toMatch(/educative\.io/i);
      });
    });
  }
});

const MOCK_ROOT = join(process.cwd(), 'src/content/mocks');
const MAX_HINT_WORDS = 30;

describe('soal mock interview', () => {
  const mockFiles = walk(MOCK_ROOT);
  it('ada minimal satu soal mock', () => expect(mockFiles.length).toBeGreaterThan(0));

  for (const file of mockFiles) {
    const id = relative(MOCK_ROOT, file).replace(/\.mdx?$/, '');
    const { data, content } = matter(readFileSync(file, 'utf8'));
    describe(id, () => {
      it('frontmatter wajib', () => {
        expect(typeof data.title).toBe('string');
        expect(data.order).toBeGreaterThan(0);
        expect(Array.isArray(data.hints) && data.hints.length >= 3).toBe(true);
        if (data.relatedCase) expect(planned.has(data.relatedCase)).toBe(true);
      });
      it('petunjuk pendek dan jelas', () => {
        const long = (data.hints as string[]).filter((h) => h.split(/\s+/).length > MAX_HINT_WORDS);
        expect(long).toEqual([]);
      });
      it('body berisi soal dan daftar yang diharapkan', () => {
        expect(content).toMatch(/\*\*Soal\.\*\*/);
        expect((content.match(/^\d+\. /gm) ?? []).length).toBeGreaterThanOrEqual(5);
      });
      it('mengikuti pedoman gaya bahasa', () => {
        expect(styleLint(content)).toEqual([]);
        const hintErrors = (data.hints as string[]).filter((h) => h.includes('→') || /;\s/.test(h));
        expect(hintErrors).toEqual([]);
      });
    });
  }
});
