/**
 * Adapter localStorage. Dipisah supaya logika murni di progress.ts / mock.ts bisa diuji tanpa browser.
 */
import { coerceState, emptyState, type ProgressState } from './progress';
import { coerceMockStore, emptyMockStore, type MockStore } from './mock';
import { coerceQuestionStore, emptyQuestionStore, type QuestionStore } from './questions';

export const PROGRESS_KEY = 'sdl:progress:v1';
export const MOCK_KEY = 'sdl:mock:v1';
export const QUESTIONS_KEY = 'sdl:questions:v1';
export const THEME_KEY = 'sdl:theme';

export interface KV {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function readJson(kv: KV, key: string): unknown {
  try {
    const raw = kv.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function writeJson(kv: KV, key: string, value: unknown): void {
  try {
    kv.setItem(key, JSON.stringify(value));
  } catch {
    // storage penuh / private mode: abaikan, state tetap di memori
  }
}

export function loadProgress(kv: KV): ProgressState {
  const raw = readJson(kv, PROGRESS_KEY);
  return raw === undefined ? emptyState() : coerceState(raw);
}

export function saveProgress(kv: KV, state: ProgressState): void {
  writeJson(kv, PROGRESS_KEY, state);
}

export function loadMocks(kv: KV): MockStore {
  const raw = readJson(kv, MOCK_KEY);
  return raw === undefined ? emptyMockStore() : coerceMockStore(raw);
}

export function saveMocks(kv: KV, store: MockStore): void {
  writeJson(kv, MOCK_KEY, store);
}

export function loadQuestions(kv: KV): QuestionStore {
  const raw = readJson(kv, QUESTIONS_KEY);
  return raw === undefined ? emptyQuestionStore() : coerceQuestionStore(raw);
}

export function saveQuestions(kv: KV, store: QuestionStore): void {
  writeJson(kv, QUESTIONS_KEY, store);
}

/** Dipakai di browser; di SSR/test kembalikan adapter memori. */
export function browserStorage(): KV {
  if (typeof localStorage !== 'undefined') return localStorage;
  const mem = new Map<string, string>();
  return { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v) };
}

/** Event global supaya sidebar/progress bar ikut update saat state berubah. */
export const PROGRESS_EVENT = 'sdl:progress-changed';
