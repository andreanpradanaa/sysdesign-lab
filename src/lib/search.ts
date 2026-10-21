/** Indeks pencarian ringan: dibangun saat build (search.json), dicari di browser. */
export interface SearchDoc {
  id: string;
  title: string;
  summary: string;
  module: string;
  type: 'lesson' | 'case' | 'postmortem' | 'mock' | 'page';
  url: string;
  tags: string[];
  headings: string[];
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}

const WORD = /[a-z0-9]+/g;

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(WORD) ?? []).filter((t) => t.length > 1);
}

/** Skor sederhana: judul 5, tag 3, heading 2, ringkasan 1; prefix match dihitung. */
export function searchDocs(docs: SearchDoc[], query: string, limit = 8): SearchHit[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];
  const hits: SearchHit[] = [];
  for (const doc of docs) {
    const title = tokenize(doc.title);
    const tags = doc.tags.flatMap(tokenize);
    const heads = doc.headings.flatMap(tokenize);
    const summary = tokenize(doc.summary);
    let score = 0;
    for (const t of terms) {
      const match = (tokens: string[]) => tokens.some((w) => w === t || w.startsWith(t));
      if (match(title)) score += 5;
      if (match(tags)) score += 3;
      if (match(heads)) score += 2;
      if (match(summary)) score += 1;
    }
    if (score > 0) hits.push({ doc, score });
  }
  return hits.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title)).slice(0, limit);
}
