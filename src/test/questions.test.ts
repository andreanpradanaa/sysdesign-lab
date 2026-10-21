import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../data/questions';
import {
  filterQuestions,
  allTags,
  emptyQuestionStore,
  addReport,
  removeReport,
  markAttempted,
  unmarkAttempted,
  reportToQuestion,
  coerceQuestionStore,
} from '../lib/questions';
import { plannedOrder } from '../data/curriculum';

describe('data bank soal', () => {
  it('id unik, minimal 40 soal, tag dan ringkasan terisi', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    for (const q of QUESTIONS) {
      expect(q.tags.length).toBeGreaterThan(0);
      expect(q.summary.split(/\s+/).length).toBeLessThanOrEqual(30);
      expect(q.added).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it('rujukan pelajaran ada di kurikulum', () => {
    const planned = new Set(plannedOrder());
    for (const q of QUESTIONS) if (q.lesson) expect(planned.has(q.lesson)).toBe(true);
  });
});

describe('filter dan urutan', () => {
  it('filter tipe, kesulitan, level, tag', () => {
    expect(filterQuestions(QUESTIONS, { type: 'infra' }).every((q) => q.type === 'infra')).toBe(true);
    expect(filterQuestions(QUESTIONS, { difficulty: 'mudah' }).every((q) => q.difficulty === 'mudah')).toBe(
      true,
    );
    expect(filterQuestions(QUESTIONS, { level: 'staff' }).length).toBeGreaterThan(0);
    expect(filterQuestions(QUESTIONS, { tag: 'geospatial' }).length).toBeGreaterThanOrEqual(3);
  });
  it('pencarian memakai semua term dan prefix', () => {
    const hits = filterQuestions(QUESTIONS, { q: 'pemendek url' });
    expect(hits.map((q) => q.id)).toContain('url-shortener');
    expect(filterQuestions(QUESTIONS, { q: 'zzz' })).toEqual([]);
  });
  it('urutan judul dan kesulitan', () => {
    const byTitle = filterQuestions(QUESTIONS, { sort: 'judul' }).map((q) => q.title);
    expect([...byTitle].sort((a, b) => a.localeCompare(b, 'id'))).toEqual(byTitle);
    const byDiff = filterQuestions(QUESTIONS, { sort: 'kesulitan' }).map((q) => q.difficulty);
    expect(byDiff.indexOf('sulit')).toBeGreaterThan(byDiff.lastIndexOf('mudah'));
  });
  it('allTags menghitung frekuensi', () => {
    const tags = allTags(QUESTIONS);
    expect(tags[0].count).toBeGreaterThanOrEqual(tags[1].count);
    expect(tags.find((t) => t.tag === 'Realtime')?.count).toBeGreaterThanOrEqual(5);
  });
});

describe('laporan pribadi dan tanda sudah dicoba', () => {
  const now = new Date('2026-10-21T10:00:00Z');
  it('addReport, removeReport, reportToQuestion, filter sumber', () => {
    let s = addReport(
      emptyQuestionStore(),
      {
        title: ' Rancang sistem antrian klinik ',
        company: 'Startup X',
        level: 'mid',
        type: 'product',
        difficulty: 'sedang',
        notes: 'ditanya 40 menit',
        date: '2026-10-20',
      },
      now,
    );
    expect(s.reports[0].id).toBe(`laporan-${now.getTime()}`);
    expect(s.reports[0].title).toBe('Rancang sistem antrian klinik');
    const q = reportToQuestion(s.reports[0]);
    expect(q.tags).toEqual(['Startup X']);
    expect(filterQuestions([...QUESTIONS, q], { source: 'laporan' })).toHaveLength(1);
    expect(filterQuestions([...QUESTIONS, q], { source: 'kurikulum' })).toHaveLength(QUESTIONS.length);
    s = removeReport(s, s.reports[0].id);
    expect(s.reports).toEqual([]);
  });
  it('markAttempted dan unmarkAttempted', () => {
    let s = markAttempted(emptyQuestionStore(), 'uber', now);
    expect(s.attempted.uber).toBe(now.toISOString());
    s = unmarkAttempted(s, 'uber');
    expect(s.attempted.uber).toBeUndefined();
  });
  it('coerceQuestionStore membersihkan data rusak', () => {
    expect(coerceQuestionStore(null)).toEqual(emptyQuestionStore());
    expect(
      coerceQuestionStore({ version: 1, reports: [{ title: 'ok' }, 'x', null], attempted: 'bad' }),
    ).toEqual({ version: 1, reports: [{ title: 'ok' }], attempted: {} });
  });
});
