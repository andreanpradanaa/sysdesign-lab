---
title: 'Rancang sistem deployment (CD) skala besar'
order: 13
minutes: 45
relatedCase: 'bagian-3/deployment-system'
difficulty: 'sedang'
hints:
  - 'Tanyakan target (VM/K8s), jumlah service dan deploy per hari, multi-region, kebutuhan audit.'
  - 'Artefak immutable by digest, ditandatangani; distribusi dengan mirror/P2P.'
  - 'Rollout progresif: canary dengan analisis otomatis canary vs baseline, region bertahap, rollback cepat.'
  - 'Pisahkan control plane dari data plane: produksi tidak bergantung pada sistem deploy saat runtime.'
  - 'Migrasi expand-contract dan feature flag.'
---

**Soal.** Rancang sistem continuous deployment yang mengirim ribuan rilis per hari dari ratusan tim ke ribuan instance di beberapa region, dengan canary otomatis, rollback cepat, dan audit lengkap.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (tanpa downtime, deteksi/rollback cepat, reproducibility).
2. Estimasi deploy/hari, artefak, distribusi, query analisis.
3. API artefak, release dengan strategi/langkah, promote/rollback, flag.
4. Skema artefak, release, state per target, audit, analisis.
5. High-level design: CI → registry → orchestrator → worker per region → cluster, dengan analisis dan monitoring.
6. Deep dive: strategi rollout dan canary analysis; orchestrator, idempotency langkah, kegagalan sistem deploy.
7. Evaluasi: masalah yang muncul di 100%, sistem deploy mati, bottleneck distribusi.
