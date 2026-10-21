import { describe, it, expect } from 'vitest';
import { sidebarModel, prevNext, availableIds, publishedLessons, type Lesson } from '../lib/content';
import { href, lessonHref, mockHref } from '../lib/url';

function lesson(id: string, extra: Partial<Lesson['data']> = {}): Lesson {
  return {
    id,
    collection: 'lessons',
    data: { title: `Judul ${id}`, minutes: 30, type: 'lesson', draft: false, ...extra },
  } as unknown as Lesson;
}

const L = [lesson('bagian-1/estimasi-kapasitas'), lesson('bagian-3/tinyurl', { type: 'case', minutes: 60 })];

describe('content helpers', () => {
  it('availableIds mengikuti urutan input', () => {
    expect(availableIds(L)).toEqual(['bagian-1/estimasi-kapasitas', 'bagian-3/tinyurl']);
  });

  it('sidebarModel menandai tersedia vs segera dan memakai judul frontmatter', () => {
    const m = sidebarModel(L);
    expect(m).toHaveLength(4);
    const b1 = m[0].items;
    expect(b1[0]).toMatchObject({ id: 'bagian-1/cara-kerja-interview', available: false });
    expect(b1[4]).toMatchObject({
      id: 'bagian-1/estimasi-kapasitas',
      available: true,
      title: 'Judul bagian-1/estimasi-kapasitas',
      minutes: 30,
    });
    expect(m[2].items[0]).toMatchObject({ id: 'bagian-3/tinyurl', available: true, type: 'case' });
  });

  it('prevNext', () => {
    expect(prevNext(L, 'bagian-1/estimasi-kapasitas')).toEqual({ prev: undefined, next: L[1] });
    expect(prevNext(L, 'bagian-3/tinyurl')).toEqual({ prev: L[0], next: undefined });
    expect(prevNext(L, 'tidak-ada')).toEqual({ prev: undefined, next: undefined });
  });

  it('publishedLessons memakai koleksi (stub kosong)', async () => {
    expect(await publishedLessons()).toEqual([]);
  });
});

describe('url', () => {
  it('href menambahkan base dan slash awal', () => {
    expect(href('/mock')).toMatch(/\/mock$/);
    expect(href('mock')).toBe(href('/mock'));
    expect(lessonHref('bagian-1/x')).toMatch(/\/belajar\/bagian-1\/x$/);
    expect(mockHref('tinyurl')).toMatch(/\/mock\/tinyurl$/);
  });
});
