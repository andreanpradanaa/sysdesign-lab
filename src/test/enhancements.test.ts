import { describe, it, expect } from 'vitest';
import {
  emptyState,
  recordActivity,
  streak,
  dayKey,
  markDone,
  recordQuiz,
  setNote,
  toggleBookmark,
  isBookmarked,
  summarizeByModule,
  weakestAreas,
  coerceState,
} from '../lib/progress';
import { searchDocs, tokenize, type SearchDoc } from '../lib/search';
import { sessionReport, STAGE_PROMPTS, STAGES, type MockSession } from '../lib/mock';

const D = (s: string) => new Date(`${s}T12:00:00`);

describe('aktivitas dan streak', () => {
  it('recordActivity menghitung per hari lokal', () => {
    let s = recordActivity(emptyState(), D('2026-10-21'));
    s = recordActivity(s, D('2026-10-21'));
    expect(s.activity[dayKey(D('2026-10-21'))]).toBe(2);
  });
  it('streak menghitung hari berturut-turut sampai hari ini', () => {
    let s = emptyState();
    for (const d of ['2026-10-19', '2026-10-20', '2026-10-21']) s = recordActivity(s, D(d));
    expect(streak(s, D('2026-10-21'))).toBe(3);
  });
  it('streak tetap hidup bila hari ini belum belajar tetapi kemarin iya', () => {
    let s = emptyState();
    for (const d of ['2026-10-19', '2026-10-20']) s = recordActivity(s, D(d));
    expect(streak(s, D('2026-10-21'))).toBe(2);
    expect(streak(s, D('2026-10-23'))).toBe(0);
  });
  it('markDone dan recordQuiz ikut mencatat aktivitas', () => {
    let s = markDone(emptyState(), 'bagian-1/a', D('2026-10-21'));
    s = recordQuiz(s, 'bagian-1/a', 3, 4, D('2026-10-21'));
    expect(s.activity[dayKey(D('2026-10-21'))]).toBe(2);
  });
});

describe('catatan dan bookmark', () => {
  it('setNote menyimpan dan menghapus bila kosong', () => {
    let s = setNote(emptyState(), 'x', 'ingat idempotency');
    expect(s.notes.x).toBe('ingat idempotency');
    s = setNote(s, 'x', '   ');
    expect(s.notes.x).toBeUndefined();
  });
  it('toggleBookmark bolak-balik tanpa duplikat', () => {
    let s = toggleBookmark(emptyState(), 'x');
    s = toggleBookmark(s, 'y');
    expect(isBookmarked(s, 'x')).toBe(true);
    s = toggleBookmark(s, 'x');
    expect(s.bookmarks).toEqual(['y']);
  });
  it('coerceState mengisi field baru dari data lama', () => {
    const old = { version: 1, completed: {}, quiz: {} };
    const s = coerceState(old);
    expect(s.activity).toEqual({});
    expect(s.notes).toEqual({});
    expect(s.bookmarks).toEqual([]);
    expect(
      coerceState({ version: 1, completed: {}, quiz: {}, bookmarks: ['a', 3], notes: { a: 1 } }).bookmarks,
    ).toEqual(['a']);
  });
});

describe('ringkasan per bagian dan area lemah', () => {
  it('summarizeByModule', () => {
    const avail = ['bagian-1/a', 'bagian-1/b', 'bagian-2/c'];
    const s = markDone(emptyState(), 'bagian-1/a', D('2026-10-21'));
    const by = summarizeByModule(s, avail);
    expect(by['bagian-1']).toEqual({ done: 1, total: 2, percent: 50 });
    expect(by['bagian-2']).toEqual({ done: 0, total: 1, percent: 0 });
  });
  it('weakestAreas mengurutkan dari skor terendah dan melewati yang sempurna', () => {
    let s = recordQuiz(emptyState(), 'a', 1, 4, D('2026-10-21'));
    s = recordQuiz(s, 'b', 4, 4, D('2026-10-21'));
    s = recordQuiz(s, 'c', 2, 4, D('2026-10-21'));
    expect(weakestAreas(s, 3)).toEqual([
      { id: 'a', percent: 25 },
      { id: 'c', percent: 50 },
    ]);
    expect(weakestAreas(s, 1)).toHaveLength(1);
  });
});

describe('pencarian', () => {
  const docs: SearchDoc[] = [
    {
      id: 'bagian-2/distributed-cache',
      title: 'Distributed cache',
      summary: 'stampede hot key',
      module: 'bagian-2',
      type: 'lesson',
      url: '/belajar/bagian-2/distributed-cache',
      tags: [],
      headings: ['Eviction dan TTL'],
    },
    {
      id: 'bagian-3/tinyurl',
      title: 'TinyURL: layanan pemendek URL',
      summary: 'key generation',
      module: 'bagian-3',
      type: 'case',
      url: '/belajar/bagian-3/tinyurl',
      tags: ['Scaling reads'],
      headings: [],
    },
  ];
  it('tokenize membuang token pendek dan huruf besar', () => {
    expect(tokenize('Hot Key, TTL & a')).toEqual(['hot', 'key', 'ttl']);
  });
  it('judul lebih berbobot dari ringkasan dan prefix cocok', () => {
    const hits = searchDocs(docs, 'cach');
    expect(hits[0].doc.id).toBe('bagian-2/distributed-cache');
    expect(searchDocs(docs, 'scaling')[0].doc.id).toBe('bagian-3/tinyurl');
    expect(searchDocs(docs, '')).toEqual([]);
    expect(searchDocs(docs, 'zzz')).toEqual([]);
  });
});

describe('laporan sesi mock', () => {
  const base: MockSession = {
    at: 'd',
    elapsedSec: 2400,
    stagesDone: ['requirements', 'estimation'],
    scores: { hld: 2, tradeoffs: 4, requirements: 3 },
    notes: '',
  };
  it('menghitung rata-rata, selisih, kriteria terlemah, dan jumlah nilai maksimal', () => {
    const prev: MockSession = { ...base, scores: { hld: 2, tradeoffs: 2 } };
    const r = sessionReport(base, prev);
    expect(r.average).toBe(3);
    expect(r.previousAverage).toBe(2);
    expect(r.delta).toBe(1);
    expect(r.weakest).toEqual(['hld']);
    expect(r.bestCount).toBe(1);
    expect(r.stagesDone).toBe(2);
    expect(r.stagesTotal).toBe(STAGES.length);
  });
  it('tanpa sesi sebelumnya tidak ada selisih', () => {
    const r = sessionReport(base);
    expect(r.delta).toBeUndefined();
    expect(sessionReport({ ...base, scores: {} }).weakest).toEqual([]);
  });
  it('setiap tahap punya pertanyaan pemandu', () => {
    for (const s of STAGES) expect(STAGE_PROMPTS[s.id]?.length).toBeGreaterThanOrEqual(2);
  });
});
