---
title: 'Rancang home timeline (Twitter)'
order: 3
minutes: 45
relatedCase: 'bagian-3/newsfeed'
difficulty: 'sedang'
hints:
  - 'Tanyakan apakah timeline kronologis atau berperingkat, apakah ada akun dengan puluhan juta follower, dan berapa pengguna aktif harian.'
  - 'Hitung QPS baca dan tulis. Rasio yang ekstrem harus mengarahkan kamu ke timeline yang dihitung di muka.'
  - 'Bandingkan fan-out saat tulis dan fan-out saat baca, lalu jelaskan pendekatan campuran dan ambang selebriti.'
  - 'Jelaskan isi cache timeline, yaitu daftar ID bukan objek, dan cara membangunnya ulang saat cache hilang.'
---

**Soal.** Rancang home timeline seperti Twitter. Pengguna memposting teks pendek, mengikuti pengguna lain, dan melihat post terbaru dari akun yang diikuti dengan latency rendah. Skalanya ratusan juta pengguna.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement fungsional dan non-fungsional dengan angka latency dan model konsistensi.
2. Hitung QPS baca dan tulis, beban fan-out, dan ukuran cache.
3. Rancang API untuk memposting, membaca timeline dengan cursor, dan mengikuti akun.
4. Rancang skema post, graf sosial dua arah, dan struktur cache.
5. Gambar high-level design dengan alur tulis yang melakukan fan-out dan alur baca yang menggabung lalu melengkapi data.
6. Dalami strategi fan-out dan masalah selebriti, lalu desain cache timeline.
7. Evaluasi latency p99, availability saat cache hilang, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
