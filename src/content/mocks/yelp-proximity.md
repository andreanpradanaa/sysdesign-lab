---
title: 'Rancang Yelp (pencarian tempat terdekat)'
order: 9
minutes: 45
relatedCase: 'bagian-3/yelp-proximity'
difficulty: 'sedang'
hints:
  - 'Tanyakan radius maksimum, urutan hasil, dan seberapa sering data tempat berubah.'
  - 'Jelaskan kenapa index latitude dan longitude yang terpisah tidak cukup, lalu bandingkan geohash, S2 atau H3, dan quadtree.'
  - 'Pisahkan index geospasial ringkas yang direplikasi di memori dari detail tempat di database dan cache. Sinkronkan lewat CDC.'
  - 'Ingat batas sel: cari di sel pengguna dan sel tetangga, lalu saring dengan jarak sebenarnya.'
---

**Soal.** Rancang layanan seperti Yelp. Pengguna mencari tempat seperti restoran atau toko dalam radius tertentu dari posisinya, lalu melihat detail dan rating. Pemilik tempat bisa memperbarui informasi tempatnya.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk latency pencarian, kelengkapan hasil, dan konsistensi eventual.
2. Hitung QPS pencarian, ukuran index geospasial, dan cache detail tempat.
3. Rancang API pencarian dengan radius, kategori, teks, dan cursor, lalu API detail dan pengelolaan oleh pemilik.
4. Rancang skema sumber kebenaran dan index turunan, lalu pilih ukuran sel.
5. Gambar high-level design dengan alur pencarian dan alur perubahan data.
6. Dalami pemilihan index geospasial, lalu partisi dan replikasi index.
7. Evaluasi area yang sangat padat, kegagalan replika, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
