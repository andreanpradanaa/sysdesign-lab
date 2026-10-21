---
title: 'Rancang Google Maps (peta, rute, ETA)'
order: 8
minutes: 45
relatedCase: 'bagian-3/google-maps'
difficulty: 'sulit'
hints:
  - 'Tanyakan fokusnya: peta, pencarian tempat, rute, atau ETA. Interviewer biasanya memilih satu untuk didalami.'
  - 'Peta adalah tile statis dengan skema zoom, x, y di blob store dan CDN, dengan versi di URL. Bandingkan vector dan raster.'
  - 'Rute memakai graf jalan yang diproses di muka dengan contraction hierarchies di memori, pencarian dua arah, dan bobot dinamis untuk lalu lintas.'
  - 'ETA memakai bobot per segmen dari probe yang diagregasi ditambah prediksi. Jelaskan pipeline stream-nya.'
---

**Soal.** Rancang layanan peta. Pengguna bisa menggeser dan memperbesar peta dunia, mencari tempat, menghitung rute mobil dengan ETA yang memperhitungkan lalu lintas, dan memakai navigasi.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk latency tile, latency rute, akurasi ETA, dan kesegaran data.
2. Hitung jumlah dan ukuran tile, ukuran graf jalan, QPS rute, dan laju probe lalu lintas yang masuk.
3. Rancang API tile, geocode, route, eta, dan navigation.
4. Rancang skema data sumber dan data turunan: graf, tile, index tempat, dan traffic store, dengan versi rilis.
5. Gambar high-level design yang memisahkan pipeline batch rilis dari jalur online untuk tile, rute, dan lalu lintas.
6. Dalami routing dari pemrosesan di muka sampai query, lalu lapisan lalu lintas dan ETA.
7. Evaluasi availability saat traffic store mati, risiko rilis graf, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
