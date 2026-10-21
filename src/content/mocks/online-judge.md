---
title: 'Rancang online judge (LeetCode)'
order: 14
minutes: 45
relatedCase: 'bagian-3/online-judge'
difficulty: 'sedang'
hints:
  - 'Tanyakan bahasa yang didukung, apakah ada contest selain latihan, apakah ada checker khusus, dan batas waktu serta memori per soal.'
  - 'Kode tidak dipercaya. Pakai isolasi berlapis: namespace, cgroups, seccomp, tanpa jaringan, dan sandbox seperti gVisor atau microVM.'
  - 'Keadilan: worker yang seragam, satu submission per core, ukur CPU time, dan kalibrasi batas per bahasa.'
  - 'Queue durable dengan prioritas dan visibility timeout. Autoscale dari lag, dan hangatkan kapasitas sebelum contest.'
---

**Soal.** Rancang platform seperti LeetCode. Pengguna mengirim kode dalam berbagai bahasa, dan sistem menjalankannya terhadap test case tersembunyi dengan batas waktu dan memori secara aman dan adil. Contest bisa menghasilkan ribuan submission per detik dengan leaderboard.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk keamanan, keadilan, latency verdict, dan lonjakan contest.
2. Hitung submission per detik, kebutuhan CPU, storage, dan puncak contest.
3. Rancang API untuk run, submit, dan status dengan stream, lalu leaderboard dan pembuatan soal.
4. Rancang skema soal, test case di blob store, submission, hasil per test, dan leaderboard.
5. Gambar high-level design dengan alur submit sampai verdict.
6. Dalami sandbox dan pengukuran, lalu antrian, prioritas, dan autoscale.
7. Evaluasi celah keamanan sandbox, broker yang mati, biaya, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
