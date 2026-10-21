/**
 * State progress belajar. Disimpan di localStorage (lihat storage.ts).
 * Semua fungsi di sini murni: menerima state, mengembalikan state baru.
 */
export interface QuizResult {
  score: number;
  total: number;
  at: string; // ISO date
}

export interface ProgressState {
  version: 1;
  completed: Record<string, string>; // lessonId -> ISO date selesai
  quiz: Record<string, QuizResult>; // lessonId -> hasil terakhir
  lastVisited?: string; // lessonId terakhir dibuka
  activity: Record<string, number>; // 'YYYY-MM-DD' -> jumlah aksi belajar hari itu
  notes: Record<string, string>; // lessonId -> catatan belajar
  bookmarks: string[]; // lessonId yang disimpan
}

export function emptyState(): ProgressState {
  return { version: 1, completed: {}, quiz: {}, activity: {}, notes: {}, bookmarks: [] };
}

/** Kunci hari lokal 'YYYY-MM-DD'. */
export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Catat satu aksi belajar (buka pelajaran, selesai, kuis) pada hari itu. */
export function recordActivity(state: ProgressState, now: Date = new Date()): ProgressState {
  const key = dayKey(now);
  return { ...state, activity: { ...state.activity, [key]: (state.activity[key] ?? 0) + 1 } };
}

/** Jumlah hari berturut-turut sampai hari ini (atau kemarin) dengan aktivitas. */
export function streak(state: ProgressState, now: Date = new Date()): number {
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!state.activity[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1); // hari ini belum belajar: hitung dari kemarin
  let n = 0;
  while (state.activity[dayKey(cursor)]) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function markDone(state: ProgressState, id: string, now: Date = new Date()): ProgressState {
  return recordActivity({ ...state, completed: { ...state.completed, [id]: now.toISOString() } }, now);
}

export function markUndone(state: ProgressState, id: string): ProgressState {
  const completed = { ...state.completed };
  delete completed[id];
  return { ...state, completed };
}

export function toggleDone(state: ProgressState, id: string, now: Date = new Date()): ProgressState {
  return isDone(state, id) ? markUndone(state, id) : markDone(state, id, now);
}

export function isDone(state: ProgressState, id: string): boolean {
  return Boolean(state.completed[id]);
}

export function recordQuiz(
  state: ProgressState,
  id: string,
  score: number,
  total: number,
  now: Date = new Date(),
): ProgressState {
  return recordActivity(
    { ...state, quiz: { ...state.quiz, [id]: { score, total, at: now.toISOString() } } },
    now,
  );
}

export function visit(state: ProgressState, id: string, now: Date = new Date()): ProgressState {
  return recordActivity({ ...state, lastVisited: id }, now);
}

export function setNote(state: ProgressState, id: string, text: string): ProgressState {
  const notes = { ...state.notes };
  if (text.trim()) notes[id] = text;
  else delete notes[id];
  return { ...state, notes };
}

export function toggleBookmark(state: ProgressState, id: string): ProgressState {
  const has = state.bookmarks.includes(id);
  return { ...state, bookmarks: has ? state.bookmarks.filter((b) => b !== id) : [...state.bookmarks, id] };
}

export function isBookmarked(state: ProgressState, id: string): boolean {
  return state.bookmarks.includes(id);
}

export interface ProgressSummary {
  done: number;
  total: number;
  percent: number; // 0..100, dibulatkan
}

/** Progress terhadap daftar pelajaran yang TERSEDIA (bukan yang masih direncanakan). */
export function summarize(state: ProgressState, available: string[]): ProgressSummary {
  const total = available.length;
  const done = available.filter((id) => isDone(state, id)).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

/** Progress per bagian: id bagian -> ringkasan, dari daftar id yang tersedia. */
export function summarizeByModule(
  state: ProgressState,
  available: string[],
): Record<string, ProgressSummary> {
  const groups: Record<string, string[]> = {};
  for (const id of available) {
    const mod = id.split('/')[0];
    (groups[mod] ??= []).push(id);
  }
  return Object.fromEntries(Object.entries(groups).map(([mod, ids]) => [mod, summarize(state, ids)]));
}

export interface WeakArea {
  id: string;
  percent: number;
}

/** Pelajaran dengan skor kuis terendah (di bawah ambang), paling lemah dulu. */
export function weakestAreas(state: ProgressState, limit = 3, threshold = 100): WeakArea[] {
  return Object.entries(state.quiz)
    .map(([id, r]) => ({ id, percent: r.total === 0 ? 0 : Math.round((r.score / r.total) * 100) }))
    .filter((w) => w.percent < threshold)
    .sort((a, b) => a.percent - b.percent || a.id.localeCompare(b.id))
    .slice(0, limit);
}

/**
 * Pelajaran berikutnya untuk "lanjutkan belajar":
 * 1. Pelajaran tersedia pertama (urutan kurikulum) yang belum selesai, dimulai setelah lastVisited bila ada.
 * 2. Kalau semua setelah lastVisited sudah selesai, cari dari awal.
 * 3. Kalau semua selesai, kembalikan undefined.
 */
export function nextLesson(state: ProgressState, available: string[]): string | undefined {
  if (available.length === 0) return undefined;
  const start = state.lastVisited ? available.indexOf(state.lastVisited) + 1 : 0;
  const rotated = [...available.slice(start), ...available.slice(0, start)];
  return rotated.find((id) => !isDone(state, id));
}

/** Validasi longgar untuk data dari localStorage; kembalikan state kosong bila rusak. Field baru diisi default. */
export function coerceState(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') return emptyState();
  const r = raw as Partial<ProgressState>;
  if (r.version !== 1) return emptyState();
  return {
    version: 1,
    completed: isRecordOfStrings(r.completed) ? r.completed : {},
    quiz: r.quiz && typeof r.quiz === 'object' ? (r.quiz as Record<string, QuizResult>) : {},
    lastVisited: typeof r.lastVisited === 'string' ? r.lastVisited : undefined,
    activity: isRecordOfNumbers(r.activity) ? r.activity : {},
    notes: isRecordOfStrings(r.notes) ? r.notes : {},
    bookmarks: Array.isArray(r.bookmarks)
      ? r.bookmarks.filter((b): b is string => typeof b === 'string')
      : [],
  };
}

function isRecordOfStrings(v: unknown): v is Record<string, string> {
  return (
    Boolean(v) && typeof v === 'object' && Object.values(v as object).every((x) => typeof x === 'string')
  );
}

function isRecordOfNumbers(v: unknown): v is Record<string, number> {
  return (
    Boolean(v) && typeof v === 'object' && Object.values(v as object).every((x) => typeof x === 'number')
  );
}
