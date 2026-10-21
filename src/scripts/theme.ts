/** Toggle tema. Pilihan disimpan di localStorage; default ikut prefers-color-scheme. Inisialisasi awal ada di Base.astro (inline, sebelum paint). */
export const THEME_EVENT = 'sdl:theme-changed';

export function currentTheme(): 'light' | 'dark' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: 'light' | 'dark'): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('sdl:theme', theme);
  } catch {
    /* abaikan */
  }
  document.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export function initThemeToggle(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const paint = () => {
    const dark = currentTheme() === 'dark';
    btn.setAttribute('aria-label', dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
    btn.textContent = dark ? '☀' : '☾';
  };
  paint();
  btn.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    paint();
  });
}
