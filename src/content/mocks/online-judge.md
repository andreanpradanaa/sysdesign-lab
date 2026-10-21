---
title: 'Rancang online judge (LeetCode)'
order: 14
minutes: 45
relatedCase: 'bagian-3/online-judge'
difficulty: 'sedang'
hints:
  - 'Tanyakan bahasa, contest vs latihan, checker khusus, limit per soal.'
  - 'Kode tidak dipercaya: isolasi berlapis (namespace, cgroups, seccomp, tanpa jaringan, gVisor/microVM).'
  - 'Keadilan: worker homogen, cpuset, CPU time, kalibrasi limit per bahasa.'
  - 'Queue durable dengan prioritas dan visibility timeout; autoscale dari lag; pre-warm sebelum contest.'
---

**Soal.** Rancang platform seperti LeetCode: pengguna mengirim kode dalam berbagai bahasa, sistem menjalankannya terhadap test case tersembunyi dengan batas waktu/memori secara aman dan adil, termasuk contest dengan ribuan submission per detik dan leaderboard.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (keamanan, keadilan, latency verdict, lonjakan contest).
2. Estimasi submission/detik, CPU, storage, puncak contest.
3. API run/submit/status (stream), leaderboard, pembuatan soal.
4. Skema soal, test case di blob, submission, hasil per test, leaderboard.
5. High-level design dengan alur submit sampai verdict.
6. Deep dive: sandbox dan pengukuran; antrian, prioritas, autoscale.
7. Evaluasi: zero-day sandbox, broker mati, biaya, bottleneck 10x.
