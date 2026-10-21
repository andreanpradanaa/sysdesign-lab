---
title: 'Rancang Instagram (feed foto)'
order: 4
minutes: 45
relatedCase: 'bagian-3/instagram'
difficulty: 'sedang'
hints:
  - 'Tanyakan: foto saja atau video? feed kronologis? ada akun besar? apakah Stories termasuk?'
  - 'Bandwidth keluar dari estimasi harus membawa kamu ke CDN; storage PB ke blob store.'
  - 'Jalur upload: presigned URL, pemrosesan async, status processing → ready; fan-out setelah ready.'
  - 'Feed mewarisi hybrid dari newsfeed; yang baru adalah hydrate URL varian dan prefetch.'
---

**Soal.** Rancang Instagram: user mengunggah foto dengan caption, mengikuti user lain, dan melihat feed foto dari yang diikuti. Like dan komentar termasuk.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency gambar pertama, durability media).
2. Estimasi upload/detik, tampilan/detik, bandwidth keluar, storage 5 tahun.
3. API upload dua langkah, post, feed dengan URL varian.
4. Skema post, media, follows, likes; tata letak blob store.
5. High-level design dengan alur upload (async) dan alur feed.
6. Deep dive: pipeline media dan penyajian via CDN; feed hybrid.
7. Evaluasi: apa yang terdegradasi saat pipeline media tertunda; bottleneck 10x.
