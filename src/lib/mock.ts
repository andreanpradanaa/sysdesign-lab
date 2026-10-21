/**
 * Mock interview: timer 45 menit, checklist tahap, rubrik 1-4 per kriteria.
 * Sesi disimpan per soal di localStorage (lihat storage.ts).
 */
export interface Stage {
  id: string;
  label: string;
  minutes: number; // anggaran waktu yang disarankan
}

/** Tahapan wajib, sama dengan urutan studi kasus. Total 45 menit. */
export const STAGES: Stage[] = [
  { id: 'requirements', label: 'Requirements (functional & non-functional)', minutes: 5 },
  { id: 'estimation', label: 'Estimasi kapasitas', minutes: 4 },
  { id: 'api', label: 'API design', minutes: 4 },
  { id: 'data', label: 'Skema data', minutes: 4 },
  { id: 'hld', label: 'High-level design', minutes: 10 },
  { id: 'detail', label: 'Detailed design per komponen', minutes: 12 },
  { id: 'evaluation', label: 'Evaluasi terhadap NFR & bottleneck', minutes: 4 },
  { id: 'followup', label: 'Pertanyaan lanjutan / wrap-up', minutes: 2 },
];

export interface Criterion {
  id: string;
  label: string;
  hint: string; // apa yang bernilai 4
}

export const RUBRIC: Criterion[] = [
  {
    id: 'requirements',
    label: 'Klarifikasi requirements',
    hint: '4 = menanyakan scope, skala, dan prioritas NFR sebelum menggambar.',
  },
  {
    id: 'estimation',
    label: 'Estimasi kapasitas',
    hint: '4 = QPS, storage, bandwidth dihitung dan dipakai untuk keputusan desain.',
  },
  {
    id: 'hld',
    label: 'High-level design',
    hint: '4 = komponen lengkap, alur data jelas, bisa dijelaskan end-to-end.',
  },
  {
    id: 'deep-dive',
    label: 'Deep dive komponen',
    hint: '4 = memilih 2-3 komponen kritis dan membahas internal + failure mode.',
  },
  {
    id: 'tradeoffs',
    label: 'Trade-off & alternatif',
    hint: '4 = tiap keputusan disertai alternatif dan alasan memilih.',
  },
  {
    id: 'communication',
    label: 'Komunikasi & manajemen waktu',
    hint: '4 = terstruktur, tidak tersesat di detail, selesai dalam waktu.',
  },
];

export const SCALE_MIN = 1;
export const SCALE_MAX = 4;

export interface MockSession {
  at: string; // ISO date
  elapsedSec: number;
  stagesDone: string[];
  scores: Record<string, number>; // criterionId -> 1..4
  notes: string;
}

export interface MockStore {
  version: 1;
  sessions: Record<string, MockSession[]>; // mockId -> riwayat
}

export function emptyMockStore(): MockStore {
  return { version: 1, sessions: {} };
}

export function addSession(store: MockStore, mockId: string, session: MockSession): MockStore {
  const prev = store.sessions[mockId] ?? [];
  return { ...store, sessions: { ...store.sessions, [mockId]: [...prev, session] } };
}

export function clampScore(n: number): number {
  if (!Number.isFinite(n)) return SCALE_MIN;
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, Math.round(n)));
}

/** Rata-rata skor rubrik (hanya kriteria yang diisi). 0 bila belum ada yang diisi. */
export function averageScore(scores: Record<string, number>): number {
  const vals = Object.values(scores).filter((v) => Number.isFinite(v));
  if (vals.length === 0) return 0;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
}

export function formatClock(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

/** Tahap yang "seharusnya" sedang berjalan menurut anggaran waktu kumulatif. */
export function stageAt(elapsedSec: number, stages: Stage[] = STAGES): Stage | undefined {
  let acc = 0;
  for (const st of stages) {
    acc += st.minutes * 60;
    if (elapsedSec < acc) return st;
  }
  return undefined;
}

export function coerceMockStore(raw: unknown): MockStore {
  if (!raw || typeof raw !== 'object') return emptyMockStore();
  const r = raw as Partial<MockStore>;
  if (r.version !== 1 || !r.sessions || typeof r.sessions !== 'object') return emptyMockStore();
  return { version: 1, sessions: r.sessions as Record<string, MockSession[]> };
}
