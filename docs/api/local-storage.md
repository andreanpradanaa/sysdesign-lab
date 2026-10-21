# Kontrak localStorage

Semua key diawali `sdl:`. Logika murni di `src/lib/progress.ts` dan `src/lib/mock.ts`; baca/tulis hanya lewat `src/lib/storage.ts`. Data rusak → di-coerce ke state kosong (tidak melempar error).

| Key               | Bentuk                | Ditulis oleh                | Dibaca oleh                                                     |
| ----------------- | --------------------- | --------------------------- | --------------------------------------------------------------- |
| `sdl:progress:v1` | `ProgressState`       | MarkDone, Quiz              | app.ts (sidebar, progress bar, lanjutkan), kuis/index, MarkDone |
| `sdl:mock:v1`     | `MockStore`           | MockInterview (Simpan sesi) | MockInterview (riwayat)                                         |
| `sdl:theme`       | `'light'` \| `'dark'` | theme.ts                    | inline script di Base.astro (sebelum paint)                     |

```ts
interface ProgressState {
  version: 1;
  completed: Record<lessonId, isoDate>;
  quiz: Record<lessonId, { score: number; total: number; at: isoDate }>;
  lastVisited?: lessonId;
  activity: Record<'YYYY-MM-DD', number>; // aksi belajar per hari, untuk streak
  notes: Record<lessonId, string>; // catatan belajar
  bookmarks: lessonId[]; // pelajaran tersimpan
}
interface MockStore {
  version: 1;
  sessions: Record<mockId, MockSession[]>;
}
interface MockSession {
  at: isoDate;
  elapsedSec: number;
  stagesDone: string[];
  scores: Record<criterionId, 1 | 2 | 3 | 4>;
  notes: string;
}
```

Event DOM `sdl:progress-changed` dipancarkan setelah tiap tulis progress supaya sidebar/progress bar ikut update; `sdl:theme-changed` memicu render ulang mermaid.

Migrasi: naikkan `version`, tangani di `coerceState` / `coerceMockStore`, tambah test.
