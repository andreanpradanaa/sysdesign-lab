---
title: 'Rancang Instagram (feed foto)'
order: 4
minutes: 45
relatedCase: 'bagian-3/instagram'
difficulty: 'sedang'
hints:
  - 'Tanyakan apakah hanya foto atau juga video, apakah feed kronologis, apakah ada akun besar, dan apakah Stories termasuk.'
  - 'Bandwidth keluar dari estimasi harus membawa kamu ke CDN. Storage dalam petabyte harus membawa kamu ke blob store.'
  - 'Jelaskan jalur upload: presigned URL, pemrosesan async, status processing lalu ready, dan fan-out setelah ready.'
  - 'Feed mewarisi pendekatan campuran dari newsfeed. Yang baru adalah melengkapi URL varian gambar dan prefetch di client.'
---

**Soal.** Rancang Instagram. Pengguna mengunggah foto dengan caption, mengikuti pengguna lain, dan melihat feed foto dari akun yang diikuti. Like dan komentar termasuk dalam cakupan.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional, termasuk latency gambar pertama dan durability media.
2. Hitung unggahan per detik, tampilan per detik, bandwidth keluar, dan storage untuk 5 tahun.
3. Rancang API upload dua langkah, pembuatan post, dan feed yang mengembalikan URL varian gambar.
4. Rancang skema post, media, follows, dan likes, lalu tata letak objek di blob store.
5. Gambar high-level design dengan alur upload yang asinkron dan alur feed.
6. Dalami pipeline media dan penyajian lewat CDN, lalu feed dengan pendekatan campuran.
7. Evaluasi apa yang menurun saat pipeline media tertunda dan di mana bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
