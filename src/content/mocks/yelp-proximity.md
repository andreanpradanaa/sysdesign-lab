---
title: 'Rancang Yelp (pencarian tempat terdekat)'
order: 9
minutes: 45
relatedCase: 'bagian-3/yelp-proximity'
difficulty: 'sedang'
hints:
  - 'Tanyakan radius maksimum, urutan hasil, dan seberapa sering data tempat berubah.'
  - 'Jelaskan kenapa index latitude/longitude terpisah tidak cukup, lalu bandingkan geohash, S2/H3, quadtree.'
  - 'Pisahkan index geospasial ringkas (memori, replika) dari detail tempat (DB + cache) dan sinkronkan lewat CDC.'
  - 'Batas sel: sel user + tetangga + filter jarak nyata.'
---

**Soal.** Rancang layanan seperti Yelp: user mencari tempat (restoran, toko) dalam radius tertentu dari posisinya, melihat detail dan rating, dan pemilik dapat memperbarui informasi tempat.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency pencarian, kelengkapan, konsistensi eventual).
2. Estimasi QPS pencarian, ukuran index geospasial, cache detail.
3. API search (radius, kategori, teks, cursor), detail, CRUD pemilik.
4. Skema sumber kebenaran vs index turunan; pilihan sel.
5. High-level design dengan alur pencarian dan alur perubahan.
6. Deep dive: pemilihan index geospasial dan partisi/replikasi index.
7. Evaluasi: area padat, kegagalan replika, bottleneck 10x.
