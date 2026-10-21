/** Skrip global: tema, sidebar mobile, sinkronisasi progress ke sidebar & tombol "lanjutkan". */
import { initThemeToggle } from './theme';
import { initMermaid } from './mermaid';
import { browserStorage, loadProgress, PROGRESS_EVENT } from '../lib/storage';
import { summarize, nextLesson, isDone } from '../lib/progress';

function syncProgressUI(): void {
  const state = loadProgress(browserStorage());
  const available: string[] = JSON.parse(document.body.dataset.available ?? '[]');
  const base = document.body.dataset.base ?? '';

  document.querySelectorAll<HTMLElement>('[data-lesson-id]').forEach((el) => {
    el.classList.toggle('done', isDone(state, el.dataset.lessonId!));
  });

  const { done, total, percent } = summarize(state, available);
  document.querySelectorAll<HTMLElement>('[data-progress-bar]').forEach((el) => {
    el.style.width = `${percent}%`;
  });
  document.querySelectorAll<HTMLElement>('[data-progress-text]').forEach((el) => {
    el.textContent = `${done}/${total} selesai · ${percent}%`;
  });

  const next = nextLesson(state, available);
  document.querySelectorAll<HTMLAnchorElement>('[data-continue-link]').forEach((a) => {
    if (next) {
      a.href = `${base}/belajar/${next}`;
      const title = document.querySelector<HTMLElement>(
        `[data-lesson-id="${next}"] [data-title]`,
      )?.textContent;
      a.textContent = state.lastVisited ? `Lanjutkan: ${title ?? next}` : `Mulai: ${title ?? next}`;
      a.hidden = false;
    } else {
      a.textContent = total === 0 ? 'Belum ada pelajaran' : 'Semua pelajaran selesai 🎉';
      a.removeAttribute('href');
    }
  });
}

function initSidebarToggle(): void {
  const btn = document.getElementById('menu-toggle');
  btn?.addEventListener('click', () => {
    const open = document.body.classList.toggle('sidebar-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document
    .querySelector('.main')
    ?.addEventListener('click', () => document.body.classList.remove('sidebar-open'));
}

initThemeToggle();
initSidebarToggle();
initMermaid();
syncProgressUI();
document.addEventListener(PROGRESS_EVENT, syncProgressUI);
