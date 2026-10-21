---
title: 'Rancang YouTube (video on demand)'
order: 6
minutes: 45
relatedCase: 'bagian-3/youtube'
difficulty: 'sulit'
hints:
  - 'Tanyakan: VOD saja atau live? resolusi maksimum? apakah rekomendasi termasuk?'
  - 'Estimasi bandwidth keluar harus menghasilkan angka yang mustahil dilayani origin; itu argumen CDN tingkat ISP.'
  - 'Pipeline transcoding sebagai DAG: chunk paralel, rendition bertahap, idempotent, prioritas.'
  - 'Penyajian: manifest + segmen (HLS/DASH), adaptive bitrate, URL bertanda tangan; semua statis.'
  - 'View count lewat stream + agregasi, bukan update per tontonan.'
---

**Soal.** Rancang platform video on demand seperti YouTube: kreator mengunggah video berukuran GB, penonton di seluruh dunia menonton dengan startup cepat dan tanpa buffering, skala miliaran jam tonton per hari.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (startup, rebuffer, durability, biaya).
2. Estimasi: jam tonton → stream bersamaan → bandwidth; upload → storage; transcoding → CPU.
3. API upload, metadata, playback statis, view events.
4. Skema video, rendition, stats, event stream; tata letak blob.
5. High-level design dengan alur upload (DAG) dan alur tonton (CDN).
6. Deep dive: pipeline transcoding; adaptive bitrate dan CDN.
7. Evaluasi: startup dan rebuffer, availability, bottleneck 10x, biaya.
