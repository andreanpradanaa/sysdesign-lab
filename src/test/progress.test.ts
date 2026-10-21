import { describe, it, expect } from 'vitest';
import {
  emptyState,
  markDone,
  markUndone,
  toggleDone,
  isDone,
  recordQuiz,
  visit,
  summarize,
  nextLesson,
  coerceState,
} from '../lib/progress';

const NOW = new Date('2026-10-21T10:00:00Z');
const AVAIL = ['bagian-1/a', 'bagian-1/b', 'bagian-3/tinyurl'];

describe('progress', () => {
  it('markDone / markUndone / toggleDone', () => {
    let s = markDone(emptyState(), 'bagian-1/a', NOW);
    expect(isDone(s, 'bagian-1/a')).toBe(true);
    expect(s.completed['bagian-1/a']).toBe(NOW.toISOString());
    s = markUndone(s, 'bagian-1/a');
    expect(isDone(s, 'bagian-1/a')).toBe(false);
    s = toggleDone(s, 'bagian-1/a', NOW);
    expect(isDone(s, 'bagian-1/a')).toBe(true);
    s = toggleDone(s, 'bagian-1/a', NOW);
    expect(isDone(s, 'bagian-1/a')).toBe(false);
  });

  it('tidak memutasi state lama', () => {
    const s0 = emptyState();
    markDone(s0, 'x', NOW);
    expect(s0.completed).toEqual({});
  });

  it('recordQuiz menyimpan hasil terakhir', () => {
    const s = recordQuiz(emptyState(), 'bagian-1/a', 3, 4, NOW);
    expect(s.quiz['bagian-1/a']).toEqual({ score: 3, total: 4, at: NOW.toISOString() });
  });

  it('summarize menghitung persen terhadap yang tersedia', () => {
    const s = markDone(markDone(emptyState(), 'bagian-1/a', NOW), 'bagian-9/tidak-ada', NOW);
    expect(summarize(s, AVAIL)).toEqual({ done: 1, total: 3, percent: 33 });
    expect(summarize(s, [])).toEqual({ done: 0, total: 0, percent: 0 });
  });

  describe('nextLesson', () => {
    it('mulai dari awal bila belum pernah berkunjung', () => {
      expect(nextLesson(emptyState(), AVAIL)).toBe('bagian-1/a');
    });
    it('lanjut setelah lastVisited', () => {
      const s = visit(emptyState(), 'bagian-1/a');
      expect(nextLesson(s, AVAIL)).toBe('bagian-1/b');
    });
    it('berputar ke awal bila sisa sudah selesai', () => {
      let s = visit(emptyState(), 'bagian-1/b');
      s = markDone(s, 'bagian-3/tinyurl', NOW);
      expect(nextLesson(s, AVAIL)).toBe('bagian-1/a');
    });
    it('undefined bila semua selesai atau tidak ada yang tersedia', () => {
      const s = AVAIL.reduce((acc, id) => markDone(acc, id, NOW), emptyState());
      expect(nextLesson(s, AVAIL)).toBeUndefined();
      expect(nextLesson(emptyState(), [])).toBeUndefined();
    });
  });

  describe('coerceState', () => {
    it('mengembalikan state kosong untuk data rusak', () => {
      expect(coerceState(null)).toEqual(emptyState());
      expect(coerceState('x')).toEqual(emptyState());
      expect(coerceState({ version: 2 })).toEqual(emptyState());
    });
    it('membersihkan field yang salah tipe', () => {
      const s = coerceState({ version: 1, completed: { a: 1 }, quiz: 'bad', lastVisited: 5 });
      expect(s).toEqual({ version: 1, completed: {}, quiz: {}, lastVisited: undefined });
    });
    it('mempertahankan data valid', () => {
      const good = {
        version: 1,
        completed: { a: 'd' },
        quiz: { a: { score: 1, total: 2, at: 'd' } },
        lastVisited: 'a',
      };
      expect(coerceState(good)).toEqual(good);
    });
  });
});
