---
title: 'Rancang sistem deployment (CD) skala besar'
order: 13
minutes: 45
relatedCase: 'bagian-3/deployment-system'
difficulty: 'sedang'
hints:
  - 'Tanyakan target deploy seperti VM atau Kubernetes, jumlah service dan deploy per hari, multi-region, dan kebutuhan audit.'
  - 'Artefak harus immutable dengan identitas digest dan ditandatangani. Distribusikan lewat mirror atau peer-to-peer.'
  - 'Rollout bertahap: canary dengan analisis otomatis yang membandingkan canary dan baseline, region bertahap, dan rollback cepat.'
  - 'Pisahkan control plane dari data plane supaya produksi tidak bergantung pada sistem deploy saat berjalan.'
  - 'Migrasi database memakai pola expand-contract, dan perubahan perilaku memakai feature flag.'
---

**Soal.** Rancang sistem continuous deployment yang mengirim ribuan rilis per hari dari ratusan tim ke ribuan instance di beberapa region. Sistem harus punya canary otomatis, rollback cepat, dan audit lengkap.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk deploy tanpa downtime, deteksi dan rollback cepat, dan reproducibility.
2. Hitung deploy per hari, ukuran artefak, beban distribusi, dan query analisis canary.
3. Rancang API artefak, rilis dengan strategi dan langkah, promote dan rollback, dan feature flag.
4. Rancang skema artefak, rilis, state per target, audit, dan hasil analisis.
5. Gambar high-level design dari CI ke registry, orchestrator, worker per region, dan cluster, dengan analisis dan monitoring.
6. Dalami strategi rollout dan analisis canary, lalu orchestrator, langkah yang aman diulang, dan kegagalan sistem deploy.
7. Evaluasi masalah yang baru muncul di 100% trafik, sistem deploy yang mati, dan bottleneck distribusi.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
