/** Bangun href yang menghormati `base` (GitHub Pages memakai sub-path). */
const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

export function href(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

export function lessonHref(id: string): string {
  return href(`/belajar/${id}`);
}

export function mockHref(id: string): string {
  return href(`/mock/${id}`);
}
