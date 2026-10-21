import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import { publishedLessons } from '../lib/content';
import { lessonHref, mockHref, href } from '../lib/url';
import type { SearchDoc } from '../lib/search';

/** Indeks pencarian statis: dibangun saat build, diambil modal pencarian saat pertama dibuka. */
export const GET: APIRoute = async () => {
  const lessons = await publishedLessons();
  const docs: SearchDoc[] = [];
  for (const l of lessons) {
    const { headings } = await render(l);
    docs.push({
      id: l.id,
      title: l.data.title,
      summary: l.data.summary ?? '',
      module: l.data.module,
      type: l.data.type,
      url: lessonHref(l.id),
      tags: [...l.data.tags, ...(l.data.difficulty ? [l.data.difficulty] : [])],
      headings: headings.filter((h) => h.depth <= 3).map((h) => h.text),
    });
  }
  for (const m of await getCollection('mocks')) {
    docs.push({
      id: `mock/${m.id}`,
      title: `Mock: ${m.data.title}`,
      summary: m.data.hints.join(' '),
      module: 'mock',
      type: 'mock',
      url: mockHref(m.id),
      tags: [m.data.difficulty],
      headings: [],
    });
  }
  docs.push(
    {
      id: 'page/cheatsheet',
      title: 'Cheat sheet',
      summary: 'Latency numbers, pangkat dua, availability, pola umum, memilih database',
      module: 'page',
      type: 'page',
      url: href('/cheatsheet'),
      tags: [],
      headings: [],
    },
    {
      id: 'page/dashboard',
      title: 'Dashboard',
      summary: 'Progress, streak, area lemah, catatan, bookmark',
      module: 'page',
      type: 'page',
      url: href('/dashboard'),
      tags: [],
      headings: [],
    },
  );
  return new Response(JSON.stringify(docs), { headers: { 'Content-Type': 'application/json' } });
};
