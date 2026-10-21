---
title: 'Rancang Uber (ride-hailing)'
order: 7
minutes: 45
relatedCase: 'bagian-3/uber'
difficulty: 'sulit'
hints:
  - 'Tanyakan: greedy atau batch matching? berapa pengemudi aktif? surge termasuk? pembayaran?'
  - 'Pisahkan dua jenis data: lokasi (frekuensi tinggi, boleh hilang, memori) vs trip (jarang, uang, transaksional).'
  - 'Index geospasial grid (H3/geohash/S2) dengan ring tetangga; partisi by wilayah.'
  - 'Matching stateful: CAS available → offered dengan TTL; apa yang terjadi saat node matching mati.'
  - 'Trip sebagai state machine dengan event append-only; pembayaran sebagai saga.'
---

**Soal.** Rancang layanan ride-hailing: pengemudi mengirim lokasi terus-menerus, penumpang meminta tumpangan, sistem mencocokkan dengan pengemudi terdekat dalam detik, lalu mengelola trip sampai pembayaran.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency matching, kesegaran lokasi, konsistensi trip).
2. Estimasi ping lokasi/detik, permintaan/detik, push pelacakan, tulisan trip.
3. API pengemudi (stream) dan penumpang (HTTP + push).
4. Skema lokasi di memori vs trip di DB; event trip.
5. High-level design dengan alur lokasi, permintaan/matching, dan trip.
6. Deep dive: index geospasial + partisi wilayah; matching dan kontensi.
7. Evaluasi: kegagalan node wilayah, bottleneck 10x, konsistensi pembayaran.
