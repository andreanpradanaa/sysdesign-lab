/** Bank soal: filter, pencarian, dan laporan soal pribadi (localStorage). */
import type { Question, QuestionType, Difficulty, Level } from '../data/questions';
import { tokenize } from './search';

export interface QuestionFilter {
  q?: string;
  type?: QuestionType | 'semua';
  difficulty?: Difficulty | 'semua';
  level?: Level | 'semua';
  source?: 'semua' | 'kurikulum' | 'laporan';
  tag?: string;
  sort?: 'terbaru' | 'judul' | 'kesulitan';
}

/** Laporan soal yang pengguna temui sendiri (padanan "community reported"). */
export interface UserReport {
  id: string; // 'laporan-<timestamp>'
  title: string;
  company?: string;
  level: Level;
  type: QuestionType;
  difficulty: Difficulty;
  notes: string;
  date: string; // YYYY-MM-DD
}

export interface QuestionStore {
  version: 1;
  reports: UserReport[];
  attempted: Record<string, string>; // questionId -> ISO date terakhir dicoba
}

export function emptyQuestionStore(): QuestionStore {
  return { version: 1, reports: [], attempted: {} };
}

export function coerceQuestionStore(raw: unknown): QuestionStore {
  if (!raw || typeof raw !== 'object') return emptyQuestionStore();
  const r = raw as Partial<QuestionStore>;
  if (r.version !== 1) return emptyQuestionStore();
  return {
    version: 1,
    reports: Array.isArray(r.reports)
      ? r.reports.filter((x) => x && typeof x === 'object' && typeof (x as UserReport).title === 'string')
      : [],
    attempted: r.attempted && typeof r.attempted === 'object' ? (r.attempted as Record<string, string>) : {},
  };
}

export function addReport(
  store: QuestionStore,
  report: Omit<UserReport, 'id'>,
  now: Date = new Date(),
): QuestionStore {
  const id = `laporan-${now.getTime()}`;
  return { ...store, reports: [...store.reports, { ...report, id, title: report.title.trim() }] };
}

export function removeReport(store: QuestionStore, id: string): QuestionStore {
  return { ...store, reports: store.reports.filter((r) => r.id !== id) };
}

export function markAttempted(store: QuestionStore, id: string, now: Date = new Date()): QuestionStore {
  return { ...store, attempted: { ...store.attempted, [id]: now.toISOString() } };
}

export function unmarkAttempted(store: QuestionStore, id: string): QuestionStore {
  const attempted = { ...store.attempted };
  delete attempted[id];
  return { ...store, attempted };
}

/** Laporan pengguna diubah ke bentuk Question agar bisa difilter bersama. */
export function reportToQuestion(
  r: UserReport,
): Question & { company?: string; notes?: string; isReport: true } {
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    difficulty: r.difficulty,
    level: r.level,
    tags: r.company ? [r.company] : [],
    summary: r.notes,
    added: r.date,
    company: r.company,
    notes: r.notes,
    isReport: true,
  };
}

const DIFF_ORDER: Record<Difficulty, number> = { mudah: 0, sedang: 1, sulit: 2 };

export function filterQuestions<T extends Question & { isReport?: boolean }>(
  list: T[],
  f: QuestionFilter,
): T[] {
  const terms = tokenize(f.q ?? '');
  let out = list.filter((x) => {
    if (f.type && f.type !== 'semua' && x.type !== f.type) return false;
    if (f.difficulty && f.difficulty !== 'semua' && x.difficulty !== f.difficulty) return false;
    if (f.level && f.level !== 'semua' && x.level !== f.level) return false;
    if (f.source === 'kurikulum' && x.isReport) return false;
    if (f.source === 'laporan' && !x.isReport) return false;
    if (f.tag && !x.tags.map((t) => t.toLowerCase()).includes(f.tag.toLowerCase())) return false;
    if (terms.length) {
      const hay = tokenize([x.title, x.summary, ...x.tags].join(' '));
      if (!terms.every((t) => hay.some((w) => w === t || w.startsWith(t)))) return false;
    }
    return true;
  });
  const sort = f.sort ?? 'terbaru';
  out = [...out].sort((a, b) => {
    if (sort === 'judul') return a.title.localeCompare(b.title, 'id');
    if (sort === 'kesulitan')
      return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty] || a.title.localeCompare(b.title, 'id');
    return b.added.localeCompare(a.added) || a.title.localeCompare(b.title, 'id');
  });
  return out;
}

/** Semua tag unik, diurutkan by frekuensi lalu nama. */
export function allTags(list: Question[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const q of list) for (const t of q.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
