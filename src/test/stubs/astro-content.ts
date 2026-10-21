/** Stub `astro:content` untuk Vitest: fungsi murni di src/lib/content.ts tidak memanggil getCollection. */
export async function getCollection(): Promise<never[]> {
  return [];
}
export type CollectionEntry<T extends string> = { id: string; collection: T; data: Record<string, unknown> };
