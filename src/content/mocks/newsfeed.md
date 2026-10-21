---
title: 'Rancang home timeline (Twitter)'
order: 3
minutes: 45
relatedCase: 'bagian-3/newsfeed'
difficulty: 'sedang'
hints:
  - 'Tanyakan: kronologis atau ranking? ada akun dengan puluhan juta follower? berapa DAU?'
  - 'Hitung QPS baca vs tulis; rasio ekstrem harus mengarahkan ke timeline yang dihitung di muka (pre-computed).'
  - 'Bandingkan fan-out on write vs on read, lalu jelaskan hybrid dan ambang selebriti.'
  - 'Jelaskan isi cache timeline (ID, bukan objek) dan jalur rekonstruksi saat cache hilang.'
---

**Soal.** Rancang home timeline seperti Twitter: user memposting teks pendek, mengikuti user lain, dan melihat post terbaru dari yang diikuti dengan latency rendah di skala ratusan juta user.

**Yang diharapkan dalam 45 menit:**

1. Requirements functional dan non-functional dengan angka latency dan model konsistensi.
2. Estimasi QPS baca/tulis, beban fan-out, ukuran cache.
3. API post, timeline (cursor), follow.
4. Skema post, graf sosial dua arah, struktur cache.
5. High-level design dengan alur tulis (fan-out) dan alur baca (merge + hydrate).
6. Deep dive: strategi fan-out dan masalah selebriti; desain cache timeline.
7. Evaluasi: latency p99, availability saat cache hilang, bottleneck 10x.
