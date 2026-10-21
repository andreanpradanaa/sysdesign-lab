import { describe, it, expect } from 'vitest';
import { gradeQuiz, validateQuiz, correctIndex, gradeLabel, type QuizQuestion } from '../lib/quiz';

const Q: QuizQuestion[] = [
  {
    q: 'A?',
    options: [
      { text: '1', correct: true, why: 'y' },
      { text: '2', correct: false, why: 'n' },
    ],
  },
  {
    q: 'B?',
    options: [
      { text: '1', correct: false, why: 'n' },
      { text: '2', correct: true, why: 'y' },
    ],
  },
];

describe('quiz', () => {
  it('gradeQuiz menghitung skor dan outcome per soal', () => {
    const g = gradeQuiz(Q, [0, 0]);
    expect(g.score).toBe(1);
    expect(g.total).toBe(2);
    expect(g.percent).toBe(50);
    expect(g.outcomes[0]).toEqual({ chosen: 0, correctIndex: 0, isCorrect: true });
    expect(g.outcomes[1]).toEqual({ chosen: 0, correctIndex: 1, isCorrect: false });
  });

  it('jawaban kosong dianggap salah', () => {
    const g = gradeQuiz(Q, [null, 1]);
    expect(g.score).toBe(1);
    expect(g.outcomes[0].chosen).toBeNull();
    expect(gradeQuiz([], []).percent).toBe(0);
  });

  it('validateQuiz menolak soal tanpa / lebih dari satu jawaban benar dan opsi tanpa penjelasan', () => {
    const bad: QuizQuestion[] = [
      {
        q: 'X',
        options: [
          { text: '1', correct: false, why: 'n' },
          { text: '2', correct: false, why: '' },
        ],
      },
      {
        q: 'Y',
        options: [
          { text: '1', correct: true, why: 'y' },
          { text: '2', correct: true, why: 'y' },
        ],
      },
    ];
    const errs = validateQuiz(bad);
    expect(errs).toHaveLength(3);
    expect(validateQuiz(Q)).toEqual([]);
  });

  it('correctIndex melempar error bila tidak ada jawaban benar', () => {
    expect(() => correctIndex({ q: 'Z', options: [{ text: '1', correct: false, why: 'n' }] })).toThrow();
  });

  it('gradeLabel', () => {
    expect(gradeLabel(100)).toBe('Sempurna');
    expect(gradeLabel(75)).toBe('Bagus');
    expect(gradeLabel(50)).toMatch(/Cukup/);
    expect(gradeLabel(0)).toMatch(/Baca ulang/);
  });
});
