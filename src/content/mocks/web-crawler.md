---
title: 'Rancang web crawler'
order: 2
minutes: 45
relatedCase: 'bagian-3/web-crawler'
difficulty: 'sedang'
hints:
  - 'Tanyakan tujuan crawl, skala per bulan, dan apakah perlu render JavaScript.'
  - 'Dua bagian yang hampir pasti ditanya: bagaimana kesopanan per host dijaga sambil tetap paralel, dan bagaimana dedup URL dan konten.'
  - 'Hitung laju halaman/detik, bandwidth, dan storage 5 tahun; angka storage harus membawa kamu ke blob store terkompresi.'
  - 'Sebutkan apa yang terjadi saat node frontier mati dan bagaimana spider trap ditangani.'
---

**Soal.** Rancang crawler yang mengunduh sebagian besar web (miliaran halaman) untuk mesin pencari, memperbarui halaman yang berubah, dan tidak membebani situs yang dikunjungi.

**Yang diharapkan dalam 45 menit:**

1. Requirements: cakupan, kesopanan, kesegaran, robustness; sebut yang out of scope.
2. Estimasi laju, bandwidth, storage, ukuran URL-seen set.
3. API untuk seed/recrawl dan kontrak untuk pipeline hilir.
4. Skema metadata URL, state host, penyimpanan konten.
5. High-level design dengan alur satu halaman end-to-end.
6. Deep dive: frontier (prioritas + kesopanan) dan dedup.
7. Evaluasi: bottleneck saat 10x, SPOF, trap.
