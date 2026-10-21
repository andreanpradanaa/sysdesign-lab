/** Helper server-side: gabungkan kurikulum (rencana) dengan koleksi (yang sudah ada). */
import { getCollection, type CollectionEntry } from 'astro:content';
import { CURRICULUM, plannedOrder } from '../data/curriculum';

export type Lesson = CollectionEntry<'lessons'>;

export async function publishedLessons(): Promise<Lesson[]> {
  const all = await getCollection('lessons', ({ data }) => !data.draft || import.meta.env.DEV);
  const order = plannedOrder();
  return all.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

/** Urutan id pelajaran yang tersedia, mengikuti kurikulum. */
export function availableIds(lessons: Lesson[]): string[] {
  return lessons.map((l) => l.id);
}

export interface SidebarItem {
  id: string;
  title: string;
  available: boolean;
  type?: Lesson['data']['type'];
  minutes?: number;
  difficulty?: Lesson['data']['difficulty'];
  tags?: string[];
}

export interface SidebarModule {
  id: string;
  title: string;
  description: string;
  items: SidebarItem[];
}

export function sidebarModel(lessons: Lesson[]): SidebarModule[] {
  const byId = new Map(lessons.map((l) => [l.id, l]));
  return CURRICULUM.map((m) => ({
    id: m.id,
    title: m.title,
    description: m.description,
    items: m.lessons.map((pl) => {
      const id = `${m.id}/${pl.slug}`;
      const entry = byId.get(id);
      return entry
        ? {
            id,
            title: entry.data.title,
            available: true,
            type: entry.data.type,
            minutes: entry.data.minutes,
            difficulty: entry.data.difficulty,
            tags: entry.data.tags,
          }
        : { id, title: pl.title, available: false };
    }),
  }));
}

export function prevNext(lessons: Lesson[], id: string): { prev?: Lesson; next?: Lesson } {
  const i = lessons.findIndex((l) => l.id === id);
  return {
    prev: i > 0 ? lessons[i - 1] : undefined,
    next: i >= 0 && i < lessons.length - 1 ? lessons[i + 1] : undefined,
  };
}
