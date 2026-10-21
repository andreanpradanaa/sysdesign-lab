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
  { id: 'requirements', label: 'Tentukan requirements: fungsi inti dan target non-fungsional', minutes: 5 },
  { id: 'estimation', label: 'Hitung estimasi kapasitas', minutes: 4 },
  { id: 'api', label: 'Rancang API', minutes: 4 },
  { id: 'data', label: 'Rancang skema data', minutes: 4 },
  { id: 'hld', label: 'Gambar high-level design', minutes: 10 },
  { id: 'detail', label: 'Dalami 2–3 komponen kritis', minutes: 12 },
  { id: 'evaluation', label: 'Cek ulang target non-fungsional dan bottleneck', minutes: 4 },
  { id: 'followup', label: 'Tutup: rangkuman dan pertanyaan lanjutan', minutes: 2 },
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
    hint: 'Nilai 4: kamu menanyakan cakupan, skala, dan prioritas sebelum menggambar apa pun.',
  },
  {
    id: 'estimation',
    label: 'Hitung estimasi kapasitas',
    hint: 'Nilai 4: kamu menghitung QPS, storage, dan bandwidth, lalu memakainya untuk memilih komponen.',
  },
  {
    id: 'hld',
    label: 'Gambar high-level design',
    hint: 'Nilai 4: semua komponen ada, alur data jelas, dan kamu bisa menjelaskannya dari awal sampai akhir.',
  },
  {
    id: 'deep-dive',
    label: 'Deep dive komponen',
    hint: 'Nilai 4: kamu memilih 2–3 komponen kritis dan membahas cara kerja dalam serta cara gagalnya.',
  },
  {
    id: 'tradeoffs',
    label: 'Trade-off & alternatif',
    hint: 'Nilai 4: setiap keputusan disertai alternatif yang ditolak dan alasannya.',
  },
  {
    id: 'communication',
    label: 'Komunikasi & manajemen waktu',
    hint: 'Nilai 4: penjelasan runtut, tidak tenggelam di detail, dan selesai tepat waktu.',
  },
];

/** Pertanyaan pemandu per tahap, ditampilkan di bawah checklist supaya latihan terasa terpandu. */
export const STAGE_PROMPTS: Record<string, string[]> = {
  requirements: [
    'Siapa penggunanya dan apa 3 sampai 5 fitur intinya?',
    'Apa yang sengaja kamu keluarkan dari cakupan?',
    'Berapa skalanya, dan mana yang lebih penting: konsistensi atau ketersediaan?',
  ],
  estimation: [
    'Berapa QPS baca dan tulis, termasuk puncaknya?',
    'Berapa storage untuk 5 tahun dan bandwidth keluar?',
    'Keputusan apa yang langsung mengikuti dari angka itu?',
  ],
  api: [
    'Endpoint apa saja yang dipakai client?',
    'Bagaimana request tulis dibuat aman diulang?',
    'Bagaimana paginasi dan error utama ditangani?',
  ],
  data: [
    'Entitas apa saja dan apa kunci aksesnya?',
    'Database jenis apa dan kenapa?',
    'Apa kandidat shard key-nya?',
  ],
  hld: [
    'Bisakah kamu menjelaskan satu alur baca dan satu alur tulis dari awal sampai akhir?',
    'Di mana cache, queue, dan blob store berperan?',
    'Angka estimasi mana yang mendukung tiap komponen?',
  ],
  detail: [
    'Dua atau tiga komponen mana yang paling berisiko?',
    'Bagaimana komponen itu gagal, dan apa yang kamu lakukan?',
    'Alternatif apa yang kamu tolak, dan kenapa?',
  ],
  evaluation: [
    'Apakah tiap target non-fungsional terpenuhi?',
    'Apa yang pecah duluan saat beban naik 10 kali?',
    'Komponen mana yang menjadi single point of failure?',
  ],
  followup: [
    'Apa kelemahan desainmu yang paling kamu khawatirkan?',
    'Apa yang kamu ubah kalau ada waktu lebih?',
  ],
};

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

export interface SessionReport {
  average: number;
  previousAverage?: number;
  delta?: number; // selisih rata-rata vs sesi sebelumnya
  stagesDone: number;
  stagesTotal: number;
  weakest: string[]; // criterionId dengan skor terendah (maks 2)
  bestCount: number; // kriteria bernilai maksimal
}

/** Laporan singkat setelah sesi disimpan, dibandingkan dengan sesi sebelumnya untuk soal yang sama. */
export function sessionReport(session: MockSession, previous?: MockSession): SessionReport {
  const average = averageScore(session.scores);
  const previousAverage = previous ? averageScore(previous.scores) : undefined;
  const entries = Object.entries(session.scores);
  const min = entries.length ? Math.min(...entries.map(([, v]) => v)) : 0;
  const weakest = entries
    .filter(([, v]) => v === min && v < SCALE_MAX)
    .map(([k]) => k)
    .slice(0, 2);
  return {
    average,
    previousAverage,
    delta: previousAverage === undefined ? undefined : Math.round((average - previousAverage) * 100) / 100,
    stagesDone: session.stagesDone.length,
    stagesTotal: STAGES.length,
    weakest,
    bestCount: entries.filter(([, v]) => v === SCALE_MAX).length,
  };
}

export function coerceMockStore(raw: unknown): MockStore {
  if (!raw || typeof raw !== 'object') return emptyMockStore();
  const r = raw as Partial<MockStore>;
  if (r.version !== 1 || !r.sessions || typeof r.sessions !== 'object') return emptyMockStore();
  return { version: 1, sessions: r.sessions as Record<string, MockSession[]> };
}
