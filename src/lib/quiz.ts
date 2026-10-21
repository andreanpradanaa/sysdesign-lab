/** Penilaian kuis pilihan ganda. Struktur mengikuti schema `quiz` di content.config.ts. */
export interface QuizOption {
  text: string;
  correct: boolean;
  why: string;
}

export interface QuizQuestion {
  q: string;
  options: QuizOption[];
}

export interface QuestionOutcome {
  chosen: number | null;
  correctIndex: number;
  isCorrect: boolean;
}

export interface QuizGrade {
  score: number;
  total: number;
  percent: number;
  outcomes: QuestionOutcome[];
}

export function correctIndex(q: QuizQuestion): number {
  const idx = q.options.findIndex((o) => o.correct);
  if (idx < 0) throw new Error(`Soal tanpa jawaban benar: "${q.q}"`);
  return idx;
}

/** Setiap soal harus punya tepat satu jawaban benar. Dipakai test konten. */
export function validateQuiz(questions: QuizQuestion[]): string[] {
  const errors: string[] = [];
  questions.forEach((q, i) => {
    const n = q.options.filter((o) => o.correct).length;
    if (n !== 1) errors.push(`Soal #${i + 1} punya ${n} jawaban benar (harus tepat 1): "${q.q}"`);
    q.options.forEach((o, j) => {
      if (!o.why.trim()) errors.push(`Soal #${i + 1} opsi #${j + 1} tanpa penjelasan`);
    });
  });
  return errors;
}

/** answers[i] = index opsi yang dipilih untuk soal i, atau null bila belum dijawab. */
export function gradeQuiz(questions: QuizQuestion[], answers: (number | null)[]): QuizGrade {
  const outcomes = questions.map((q, i) => {
    const ci = correctIndex(q);
    const chosen = answers[i] ?? null;
    return { chosen, correctIndex: ci, isCorrect: chosen === ci };
  });
  const score = outcomes.filter((o) => o.isCorrect).length;
  const total = questions.length;
  return { score, total, percent: total === 0 ? 0 : Math.round((score / total) * 100), outcomes };
}

export function gradeLabel(percent: number): string {
  if (percent === 100) return 'Sempurna';
  if (percent >= 75) return 'Bagus';
  if (percent >= 50) return 'Cukup, ulangi bagian yang salah';
  return 'Baca ulang materinya dulu';
}
