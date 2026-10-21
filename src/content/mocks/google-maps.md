---
title: 'Rancang Google Maps (peta, rute, ETA)'
order: 8
minutes: 45
relatedCase: 'bagian-3/google-maps'
difficulty: 'sulit'
hints:
  - 'Tanyakan fokusnya: peta, pencarian tempat, rute, atau ETA; interviewer biasanya memilih satu untuk deep dive.'
  - 'Peta = tile statis (z/x/y) di blob + CDN dengan versi di URL; vector vs raster.'
  - 'Rute = graf jalan terprakomputasi (contraction hierarchies) di memori; bidirectional search; bobot dinamis untuk lalu lintas.'
  - 'ETA = bobot per segmen dari probe teragregasi + prediksi; jelaskan pipeline stream-nya.'
---

**Soal.** Rancang layanan peta: menampilkan peta dunia yang bisa di-pan/zoom, mencari tempat, menghitung rute mobil dengan ETA yang memperhitungkan lalu lintas, dan navigasi.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency tile, latency rute, akurasi ETA, kesegaran).
2. Estimasi jumlah/ukuran tile, ukuran graf, QPS rute, ingest probe.
3. API tile, geocode, route, eta, navigation.
4. Skema data sumber vs turunan (graf, tile, index tempat, traffic store) dan versi rilis.
5. High-level design: pipeline batch rilis + jalur online tile/rute/lalu lintas.
6. Deep dive: routing (prapemrosesan dan query) dan lapisan lalu lintas/ETA.
7. Evaluasi: availability saat traffic store mati, rilis graf, bottleneck 10x.
