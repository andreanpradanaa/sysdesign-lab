---
title: 'Rancang sistem pembayaran marketplace'
order: 12
minutes: 45
relatedCase: 'bagian-3/payment-system'
difficulty: 'sulit'
hints:
  - 'Tanyakan apakah kita pedagang atau platform, apakah memproses kartu sendiri atau lewat penyedia pembayaran, dan apakah refund, payout, serta mata uang termasuk.'
  - 'Throughput kecil. Yang dinilai adalah kebenaran: idempotency di setiap batas dan ledger double-entry.'
  - 'Timeout ke penyedia pembayaran berarti tidak diketahui, bukan gagal. Pakai status pending, pengecekan ulang, webhook, dan rekonsiliasi.'
  - 'Webhook bisa datang dua kali dan tidak berurutan. Dedup berdasarkan id event dan tarik status dari sumbernya.'
---

**Soal.** Rancang sistem pembayaran untuk marketplace. Pembeli membayar pesanan dengan kartu atau e-wallet lewat penyedia pembayaran, platform memotong fee, dan penjual dibayar secara terjadwal. Refund didukung, dan tidak boleh ada tagihan ganda atau uang yang hilang.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk kebenaran, konsistensi, dan keamanan termasuk PCI.
2. Hitung transaksi per detik, ukuran ledger, panggilan ke penyedia pembayaran, dan webhook yang masuk.
3. Rancang API pay-in dengan idempotency key, refund, penerima webhook, dan saldo.
4. Rancang skema pembayaran, penyimpanan idempotency key, ledger double-entry, dan event.
5. Gambar high-level design dengan alur pay-in, termasuk jalur saat timeout.
6. Dalami idempotency dari client sampai penyedia pembayaran dan ledger, lalu integrasi penyedia dan rekonsiliasi.
7. Evaluasi tagihan ganda, penyedia pembayaran yang mati, failover database, dan skala 100 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
