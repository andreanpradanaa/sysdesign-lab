import { describe, it, expect } from 'vitest';
import {
  STAGES,
  RUBRIC,
  emptyMockStore,
  addSession,
  clampScore,
  averageScore,
  formatClock,
  stageAt,
  coerceMockStore,
  type MockSession,
} from '../lib/mock';

const SESSION: MockSession = {
  at: '2026-10-21T10:00:00Z',
  elapsedSec: 2700,
  stagesDone: ['requirements'],
  scores: { hld: 3 },
  notes: 'ok',
};

describe('mock', () => {
  it('anggaran tahap berjumlah 45 menit', () => {
    expect(STAGES.reduce((a, s) => a + s.minutes, 0)).toBe(45);
    expect(RUBRIC.length).toBeGreaterThanOrEqual(5);
  });

  it('addSession menambah riwayat per soal', () => {
    let st = addSession(emptyMockStore(), 'tinyurl', SESSION);
    st = addSession(st, 'tinyurl', SESSION);
    expect(st.sessions.tinyurl).toHaveLength(2);
    expect(st.sessions.lain).toBeUndefined();
  });

  it('clampScore membatasi 1..4', () => {
    expect(clampScore(0)).toBe(1);
    expect(clampScore(9)).toBe(4);
    expect(clampScore(2.6)).toBe(3);
    expect(clampScore(NaN)).toBe(1);
  });

  it('averageScore', () => {
    expect(averageScore({})).toBe(0);
    expect(averageScore({ a: 3, b: 4 })).toBe(3.5);
    expect(averageScore({ a: 1, b: 2, c: 2 })).toBe(1.67);
  });

  it('formatClock', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(2700)).toBe('45:00');
    expect(formatClock(-5)).toBe('00:00');
    expect(formatClock(61.9)).toBe('01:01');
  });

  it('stageAt mengikuti anggaran kumulatif', () => {
    expect(stageAt(0)?.id).toBe('requirements');
    expect(stageAt(5 * 60)?.id).toBe('estimation');
    expect(stageAt(44 * 60 + 59)?.id).toBe('followup');
    expect(stageAt(45 * 60)).toBeUndefined();
  });

  it('coerceMockStore', () => {
    expect(coerceMockStore(undefined)).toEqual(emptyMockStore());
    expect(coerceMockStore({ version: 1, sessions: 'x' })).toEqual(emptyMockStore());
    const good = { version: 1, sessions: { a: [SESSION] } };
    expect(coerceMockStore(good)).toEqual(good);
  });
});
