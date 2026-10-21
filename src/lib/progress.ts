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
}

export function emptyState(): ProgressState {
  return { version: 1, completed: {}, quiz: {} };
}

export function markDone(state: ProgressState, id: string, now: Date = new Date()): ProgressState {
  return { ...state, completed: { ...state.completed, [id]: now.toISOString() } };
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
  return { ...state, quiz: { ...state.quiz, [id]: { score, total, at: now.toISOString() } } };
}

export function visit(state: ProgressState, id: string): ProgressState {
  return { ...state, lastVisited: id };
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

/** Validasi longgar untuk data dari localStorage; kembalikan state kosong bila rusak. */
export function coerceState(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') return emptyState();
  const r = raw as Partial<ProgressState>;
  if (r.version !== 1) return emptyState();
  return {
    version: 1,
    completed: isRecordOfStrings(r.completed) ? r.completed : {},
    quiz: r.quiz && typeof r.quiz === 'object' ? (r.quiz as Record<string, QuizResult>) : {},
    lastVisited: typeof r.lastVisited === 'string' ? r.lastVisited : undefined,
  };
}

function isRecordOfStrings(v: unknown): v is Record<string, string> {
  return (
    Boolean(v) && typeof v === 'object' && Object.values(v as object).every((x) => typeof x === 'string')
  );
}
