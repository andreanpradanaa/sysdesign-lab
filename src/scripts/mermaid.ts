/**
 * Render blok ```mermaid di browser. Shiki dilewati untuk bahasa ini (lihat astro.config.mjs),
 * jadi markup awalnya <pre><code class="language-mermaid">. Mermaid di-load lazy hanya bila ada diagram.
 */
import { THEME_EVENT, currentTheme } from './theme';

type MermaidModule = typeof import('mermaid').default;
let mermaidPromise: Promise<MermaidModule> | undefined;

function loadMermaid(): Promise<MermaidModule> {
  mermaidPromise ??= import('mermaid').then((m) => m.default);
  return mermaidPromise;
}

async function renderAll(): Promise<void> {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('.mermaid-wrap[data-source]'));
  if (blocks.length === 0) return;
  const mermaid = await loadMermaid();
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: currentTheme() === 'dark' ? 'dark' : 'default',
    fontFamily: 'inherit',
  });
  await Promise.all(
    blocks.map(async (el, i) => {
      const source = el.dataset.source ?? '';
      try {
        const { svg } = await mermaid.render(`mmd-${Date.now()}-${i}`, source);
        el.innerHTML = svg;
      } catch (err) {
        el.innerHTML = `<pre class="small" style="text-align:left;color:var(--bad)">Diagram gagal dirender: ${String(err)}</pre>`;
      }
    }),
  );
}

export function initMermaid(): void {
  // Bungkus setiap code block mermaid sekali, simpan sumbernya untuk re-render saat tema berubah.
  document.querySelectorAll<HTMLElement>('pre > code.language-mermaid').forEach((code) => {
    const pre = code.parentElement as HTMLElement;
    const wrap = document.createElement('div');
    wrap.className = 'mermaid-wrap';
    wrap.dataset.source = code.textContent ?? '';
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', 'Diagram');
    pre.replaceWith(wrap);
  });
  void renderAll();
  document.addEventListener(THEME_EVENT, () => void renderAll());
}
