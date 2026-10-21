---
title: 'Rancang layanan pemendek URL'
order: 1
minutes: 45
relatedCase: 'bagian-3/tinyurl'
difficulty: 'mudah'
hints:
  - 'Tanyakan dulu: perlu alias kustom? perlu analytics? berapa URL baru per bulan? berapa lama URL hidup?'
  - 'Hitung baca vs tulis. Rasio 100:1 seharusnya langsung membawa kamu ke cache.'
  - 'Bagaimana key dibuat tanpa collision dan tanpa bisa ditebak? Bandingkan minimal dua pendekatan.'
  - 'Sebutkan status code redirect dan konsekuensinya terhadap caching browser dan analytics.'
  - 'Sebelum selesai, cek lagi: apa yang terjadi kalau database primary mati selama 2 menit?'
---

**Soal.** Rancang layanan seperti bit.ly: user mengirim URL panjang, mendapat URL pendek; siapa pun yang membuka URL pendek diarahkan ke URL asli.

**Yang diharapkan interviewer dalam 45 menit:**

1. Requirements functional dan non-functional, termasuk yang sengaja kamu keluarkan dari scope.
2. Estimasi QPS baca/tulis, storage 5 tahun, dan ukuran cache dengan asumsi yang kamu tulis sendiri.
3. API: minimal endpoint buat dan redirect, dengan error case.
4. Skema data dan alasan memilih jenis database.
5. High-level design yang bisa kamu jelaskan untuk satu alur tulis dan satu alur baca.
6. Deep dive dua komponen: pembuatan key dan strategi cache.
7. Evaluasi terhadap availability dan latency; sebutkan single point of failure dan mitigasinya.

Kerjakan di kertas atau whiteboard. Bicaralah keras-keras seolah ada interviewer. Baru setelah selesai, buka studi kasus terkait dan bandingkan.
